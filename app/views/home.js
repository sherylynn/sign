/**
 * Created by kenny on 16/3/5.
 */
'use strict';

import React, {
    Component, } from 'react';
import {
    Platform,
    StyleSheet,
    ListView,
    Image,
    Text,
    RefreshControl,
    TextInput,
    Alert,
    View,
    TouchableHighlight
} from 'react-native';
import {
    LazyloadScrollView,
    LazyloadListView,
    LazyloadView,
    LazyloadImage
} from 'react-native-lazyload';

import JobCell from './home/job-cell';
import JobDetail from './home/job-detail';
//import JobData from './me/NormalData';
//import JobData from './me/sign_message';
//let JobData=[]//用this.state管理
import Top15 from './me/sign';
import QRCodeScreen from './QRCodeScreen.js';

/*
const Data = {
    "成分": JobData,
    "产品": Top15,
    "功能": JobData
}*/
//从服务器获取信息
import Util from './util';
import Config from './utils/config.js';
import { create, remove, update, query } from './services/sign_actis'
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const activeButtonStyle = {
    backgroundColor: '#ddd'
};
class Button extends Component {
    constructor() {
        super();
        this.state = {
            active: false,
        };
    }
    _onHighlight = () => {
        this.setState({ active: true });
    }

    _onUnhighlight = () => {
        this.setState({ active: false });
    }

    render() {
        var colorStyle = {
            color: this.state.active ? '#fff' : '#000',
        };
        return (
            <TouchableHighlight
                onHideUnderlay={this._onUnhighlight}
                onPress={this.props.onPress}
                onShowUnderlay={this._onHighlight}
                style={[styles.button, this.props.style]}
                underlayColor="#a9d9d4">
                <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
            </TouchableHighlight>
        );
    }
}
export default class Home extends Component {
    //构造函数可以没有参数
    constructor() {
        super();
        this.state = {
            keyword: "",
            keywordType: "主题",
            number: 0,
            isRefreshing:false,
            JobData:[]
            //dataSource: ds.cloneWithRows(JobData),
        };
    } 
    async componentWillMount() {
        await this._refresh()
    }
    async _refresh(){
        try {
            //var doc = await db_local.get('user');
            //var path = Config.host + Config.sign_actis;
            console.log('预加载home')
            //var data = await Util.post_promise(path, { token: doc.token });
            var data= await query({})
            if (data.success) {
                console.log(data.data)

                this.setState({
                    keyword: "",
                    keywordType: "主题",
                    number: 0,
                    isRefreshing: false,
                    JobData:data.data
                    //dataSource: ds.cloneWithRows(JobData),
                })
            } else {
                console.log()
            }
        } catch (err) {
            console.log(err);
        }
    }
    _selectJob(job: Object) {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'JobDetail',
                component: JobDetail,
                params: { job: job }
            });
        }
    }
    _scanQR() {
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'QRCodeScreen',
                component: QRCodeScreen,
                params: {
                    cancelButtonVisible:true,
                    cancelButtonTitle:'取消',
                    onSucess:(result)=>{
                        Alert.alert(
                        '扫出内容',
                        result,
                      )
                    },
                    onCancel:(result)=>{
                      Alert.alert(
                        'Alert Title',
                        result,
                      )
                    }
                }
            });
        }
    }

    _renderRow = (jobData) => {
        return (<JobCell onSelect={() => this._selectJob(jobData) } jobData={jobData} />);
    }
    _setKeywordType = (keywordType) => {
        this.setState({
            keywordType: keywordType,
        })
    }

    _listHeader = (index) => {
        return (
            <View style={styles.headerBody}>
                <Image style={{ width: 52, height: 50 }} source={require('../images/icon_find_ok.png') }/>
                <View style={{ paddingLeft: 20 }}>
                    <Text style={{ fontSize: 18 }}>可以搜索到<Text style={{ color: '#11A984' }}>{this.state.number}</Text>个相关信息</Text>
                    <Text style={{ marginTop: 15, fontSize: 13, color: '#999' }}>搜不到建议更换关键词</Text>
                </View>
            </View>
        )
    }
    async _onRefresh() {
        this.setState({isRefreshing: true})
        await this._refresh();
    }
    render() {
        //console.log('渲染'+this.state.JobData)
        const filterText = this.state.keyword || '';
        const filterRegex = new RegExp(String(filterText), 'i');
        let filter, filterResult;
        switch (this.state.keywordType) {
            case "主题":
                filter = (example) => filterRegex.test(example["主题"]);
                this.state.number = this.state.JobData.filter(filter).length;
                filterResult = this.state.JobData.filter(filter);
                break;
            case "时间":
                filter = (example) => filterRegex.test(example["时间"]);
                this.state.number = this.state.JobData.filter(filter).length;
                filterResult = this.state.JobData.filter(filter);
                break;
            case "内容":
                filter = (example) => filterRegex.test(example["内容"]);
                this.state.number = this.state.JobData.filter(filter).length;
                filterResult = this.state.JobData.filter(filter);
                break;
            default:
                break;
        }
        const dataSource = ds.cloneWithRows(filterResult)



        let resultList = <LazyloadListView
            ref={ ref => { global._scrollView = ref } }
            name="listExample"
            automaticallyAdjustContentInsets={false}
            dataSource={dataSource}
            initialListSize={11}
            renderRow={this._renderRow}
            renderHeader={this._listHeader}
            
            refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={()=>this._onRefresh()}
                    tintColor="#3ed2a6"
                    title="Loading..."
                    titleColor="#00ff00"
                    colors={['#57ca88', '#00ff00', '#0000ff']}
                    progressBackgroundColor="#ffff00"
                />
            }
            />;
        //onFocus={() => { global._scrollView && global._scrollView.scrollTo({ y: 0 }); } } lazyload中没有这个方法
        return (
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <Text style={{ color: '#FFF', fontSize: 20 }} onPress={() => this._scanQR()} >签到</Text>
                    <View style={styles.searchInput}>
                        <Image source={require('../images/icon_search.png') } style={{ width: 25, height: 25, marginLeft: 10 }}/>
                        <TextInput
                            style={styles.input}
                            onChangeText={(keyword) => this.setState({ keyword }) }
                            placeholder="查询历次签到信息"
                            placeholderTextColor='#FFF'
                            value={this.state.keyword}
                            underlineColorAndroid='rgba(0,0,0,0)' />
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowTitle}>按以下类型搜索</Text>
                    <Button onPress={() => this.setState({ keywordType: "主题" }) } style={this.state.keywordType === '主题' ? activeButtonStyle : {}}>
                        主题
                    </Button>
                    <Button onPress={this._setKeywordType.bind(this, '时间') } style={this.state.keywordType === '时间' ? activeButtonStyle : {}}>
                        时间
                    </Button>
                    <Button onPress={this._setKeywordType.bind(this, '内容') } style={this.state.keywordType === '内容' ? activeButtonStyle : {}}>
                        内容
                    </Button>
                </View>
                {resultList}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: '#11a984',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerBody: {
        padding: 20,
        backgroundColor: '#FFF',
        marginBottom: 15,
        flexDirection: 'row'
    },
    searchInput: {
        borderRadius: 25,
        backgroundColor: '#0f9574',
        paddingTop: 0,
        paddingBottom: 0,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    input: {
        padding: 0,
        paddingLeft: 10,
        fontSize: 15,
        flex: 1,
        height: 35,
        color: '#FFF'
    },
    container: {
        top: Platform.OS === 'android' ? 0 : 20,
        flex: 1,
        backgroundColor: '#EEE',
        paddingBottom: 10
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    rowTitle: {
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 5,
        flex: 1,
        height: 44,
        alignSelf: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    buttonText: {
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },
});

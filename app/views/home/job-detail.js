/**
 * Created by kenny on 16/3/8.
 */
'use strict';

import React, {
    Component,
} from 'react';
import {
    Platform,
    StyleSheet,
    Navigator,
    TouchableOpacity,
    Image,
    Text,
    View,
    BackAndroid
} from 'react-native';

export default class JobDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { job: null };
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', () => this._pressButton());
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', () => this._pressButton());
        }
    }

    _pressButton() {
        const {navigator} = this.props;
        const routers = navigator.getCurrentRoutes();
        if (routers.length > 1) {
            navigator.pop();
            return true;
        }
        return false;
    };

    render() {
        let {job} = this.props;
        return (
            <View style={{ flex: 1 }}>
                <View
                    style={{ padding: 10, marginTop: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this._pressButton() }>
                        <Image source={require('../../images/icon_back.png') } style={{ width: 30, height: 30 }}/>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 17, flex: 1, textAlign: 'center', marginRight: 30 }}>活动详情</Text>
                </View>
                <View style={{ padding: 20,}}>
                    <Text style={{fontSize:20}}>{job["时间"]? "活动时间："+job["时间"]:"活动地点："+job["产品名称"]}</Text>
                    <Text style={{fontSize:20}}>{job["主题"]? "主题："+job["主题"]:"地点："+job["地点"]}</Text>
                    <Text style={{fontSize:17, marginTop: 8, marginBottom: 8 }}>{job["功能"]?"功能分类："+job["功能"]:"活动内容:"+job["内容"]}</Text>
                    <Text style={{fontSize:17, marginTop: 8, marginBottom: 8 }}>{job["主要用途"]?"主要用途："+job["主要用途"]:""}</Text>
                    <Text style={{ color: '#FFBCDE' }}>获得积分：{job["积分"]}</Text>
                </View>
            </View>
        );
    }
}

/**
 * Created by kenny on 16/3/6.
 */
'use strict';

import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import {
    LazyloadScrollView,
    LazyloadListView,
    LazyloadView,
    LazyloadImage
} from 'react-native-lazyload';
export default class JobCell extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let {jobData} = this.props;
        return (
            <LazyloadView host="listExample">
                <TouchableHighlight
                    onPress={this.props.onSelect}
                    underlayColor='#F5FCFF'>
                    <View style={{ backgroundColor: '#FFF' }}>
                        <View style={{ padding: 10, flexDirection: 'row' }}>
                            <Image style={styles.thumb} source={require('../../images/icon_right.png') }/>
                            <View style={{ flex: 2, paddingLeft: 10 }}>
                                <Text style={{ fontSize: 16 }}>{jobData["主题"] ? jobData["主题"] : jobData["产品名称"]}</Text>
                                <Text style={{ marginTop: 8, marginBottom: 8 }}>{jobData["时间"] ? jobData["时间"] : jobData["类别"]}</Text>
                                <Text numberOfLines={4} style={{ color: '#999' }}>{jobData["地点"] ? jobData["地点"] : (jobData["成分表"] + '...') }</Text>
                            </View>
                            <View style={{ flex: 1, paddingLeft: 10 }}>
                                <Text style={{ color: '#999', textAlign: 'right' }}>{jobData["积分"]}</Text>
                                <Text style={{ marginTop: 8, color: 'red', textAlign: 'right' }}>{jobData.salary}</Text>
                            </View>
                        </View>
                        <View style={{ padding: 10, flexDirection: 'row' }}>
                            <Text style={styles.companyTag}>{jobData.companyPosition}</Text>
                            <Text style={styles.companyTag}>{jobData.companyPerson}</Text>
                            <Text style={styles.companyTag}>{jobData.companyService}</Text>
                        </View>
                        <View style={styles.separator}/>
                    </View>
                </TouchableHighlight>
            </LazyloadView>
        );
    }
}

const styles = StyleSheet.create({
    thumb: {
        width: 32,
        height: 32,
    },
    separator: {
        height: 1,
        backgroundColor: '#E8E8E8',
    },
    companyTag: {
        color: '#999',
        fontSize: 12,
        marginLeft: 5,
        marginRight: 5,
        height: 20,
        paddingTop: 3,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: '#E8E8E8'
    },
});

/**
 * Created by kenny on 16/3/8.
 */
'use strict';

import React, {Component} from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Navigator,
  TouchableOpacity,
  Image,
  Text,
  View,
  BackAndroid
} from 'react-native';
import QRCodeScreen from './../QRCodeScreen';
import {create, remove, update, query} from '../services/sign_actis'
import PouchDB from 'pouchdb-react-native';

//缺少鉴定权限系统
export default class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: null
    };
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
  async _checkAdmin() {
    try {
      let db_local = new PouchDB('me', {adapter: 'asyncstorage'})
      let doc = await db_local.get('user');
      if (doc.username == 'admin') {
        return {success: true, message: ''};
      } else {
        return {success: false, message: '非管理员'};
      }
    } catch (err) {
      return {success: false, message: '检查是否登录'}
    }
  }
  async _scanQR() {
    let {navigator} = this.props;
    let {acti_data} = this.props;

    if (navigator) {
      navigator.push({
        name: 'QRCodeScreen',
        component: QRCodeScreen,
        params: {
          cancelButtonVisible: true,
          cancelButtonTitle: '取消',
          onSucess: (result) => {
            if (result.split("#")[1] == "user") {
              if (this._checkAdmin().success) {//是管理员
                var data = await update(acti_data)
                if (data.success) {
                  console.log(data.data) //返回的data.data应该为用户
                  Alert.alert('成功签到：', data.data['姓名'],)
                } else {
                  Alert.alert('抱歉：', data.message,)//比如已经签到或者不存在用户
                }
              } else {
                Alert.alert('抱歉：', this._checkAdmin().message,)
              }
            } else {
              Alert.alert('非用户二维码、内容：', result,)
            } //0 是"" 1是"user" 2是 id
          },
          onCancel: (result) => {
            Alert.alert('Alert Title', result,)
          }
        }
      });
    }
  }
  _onPressCancel() {
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
    var cancelButton = null;
    cancelButton = <CancelButton onPress={this
      ._scanQR
      .bind(this)} title={'签到'}/>;
    return (
      <View style={styles.camera}>
        <View
          style={{
          padding: 10,
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row'
        }}>
          <TouchableOpacity onPress={() => this._pressButton()}>
            <Image
              source={require('../../images/icon_back.png')}
              style={{
              width: 30,
              height: 30
            }}/>
          </TouchableOpacity>
          <Text
            style={{
            fontSize: 17,
            flex: 1,
            textAlign: 'center',
            marginRight: 30
          }}>活动详情</Text>
        </View>
        <View style={{
          padding: 20
        }}>
          <Text style={{
            fontSize: 20
          }}>{job["时间"]
              ? "活动时间：" + job["时间"]
              : "活动地点：" + job["产品名称"]}</Text>
          <Text style={{
            fontSize: 20
          }}>{job["主题"]
              ? "主题：" + job["主题"]
              : "地点：" + job["地点"]}</Text>
          <Text
            style={{
            fontSize: 17,
            marginTop: 8,
            marginBottom: 8
          }}>{job["功能"]
              ? "功能分类：" + job["功能"]
              : "活动内容:" + job["内容"]}</Text>
          <Text
            style={{
            fontSize: 17,
            marginTop: 8,
            marginBottom: 8
          }}>{job["主要用途"]
              ? "主要用途：" + job["主要用途"]
              : ""}</Text>
          <Text style={{
            color: '#FFBCDE'
          }}>获得积分：{job["积分"]}</Text>
        </View>
        {cancelButton}
      </View>
    );
  }

}
class CancelButton extends Component {
  render() {
    return (
      <View style={styles.cancelButton}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Text style={styles.cancelButtonText}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({

  camera: {
    height: 568,
    alignItems: 'center'
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent'
  },

  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 15,
    width: 100,
    bottom: 10
  },
  cancelButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#0097CE'
  }
});
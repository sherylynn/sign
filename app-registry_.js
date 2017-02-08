/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View
} from 'react-native';
//import Scan from 'react-native-qrscanner-kit';
import ScanQRView from './ScanQRView.js'
export default class sign extends Component {
  scanResult(data , callback){
    Alert.alert( "qrcode result " ,  data.data , [{text:"ok" , onPress:()=>callback()}],{cancelable:false}) ; 
  }
  render() {
    return (
      <View style={{flex:1 }}>
        <ScanQRView
          onBarCodeRead={this.scanResult.bind(this)}
          />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('sign', () => sign);

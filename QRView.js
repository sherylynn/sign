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
  TouchableOpacity,
  Navigator,
  View
} from 'react-native';
import QRCode from 'react-qr-code';

export default class sign extends Component {
  constructor(props){
    super(props) ;
    this.state={
    }
  }
  _onSucess(result) {
    console.log(result);
  }

  _onCancel(result) {
    console.log(result);
  }
  render(){
    return(
      <QRCode value='hello' />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

AppRegistry.registerComponent('sign', () => sign);

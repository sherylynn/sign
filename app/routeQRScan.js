/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * 
    return(
      <QRCodeScreen
        onSucess={this._onSucess}
        onCancel={this._onCancel}
        cancelButtonVisible={true}
        cancelButtonTitle={'取消'}
        />
    );
 * 
 * 
 * 
 * 
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
import QRCodeScreen from './views/QRCodeScreen.js';

export default class RouteKankan extends Component {
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
    let defaultName = 'QRCodeScreen';
    let defaultComponent = QRCodeScreen;
    return (
      <Navigator
        initialRoute={{ name: defaultName, component: defaultComponent }}
        configureScene={() => {
          return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
        } }
        renderScene={(route, navigator) => {
          let Component = route.component;
          return <Component {...route.params} navigator={navigator}/>;
        } }
      />
    )
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

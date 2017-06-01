import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View ,
  Alert ,
  Vibration , 
  TouchableOpacity,
  Platform,
  Navigator,
  BackAndroid
} from 'react-native';
import Camera from 'react-native-camera';

export default class QRCodeScreen extends Component {
  constructor(props){
    super(props) ;
    this.state={
    }
  }
  
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', () => this._onPressCancel());
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', () => _onPressCancel());
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
  /*
  _onPressCancel(){
    requestAnimationFrame(function() {
      this.props.navigator.pop();
      
      if (this.props.onCancel) {
        this.props.onCancel();
      }
      
    });
  }
  */
  _onBarCodeRead(result) {
    var $this = this;

    if (this.barCodeFlag) {
      this.barCodeFlag = true;

      setTimeout(function() {
        Vibration.vibrate();
        //$this.props.navigator.pop();
        $this.props.onSucess(result.data);
      }, 500);
    }
  }

  render(){
    let {QR}=this.props;
    var cancelButton = null;
    this.barCodeFlag = true;
    
    //if (QR.cancelButtonVisible) {
    //  cancelButton = <CancelButton onPress={this._onPressCancel.bind(this)} title={QR.cancelButtonTitle} />;
    //}
    cancelButton = <CancelButton onPress={this._onPressCancel.bind(this)} title={'取消'} />;
    return (
      <Camera onBarCodeRead={this._onBarCodeRead.bind(this)} style={styles.camera}>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle}/>
        </View>
        {cancelButton}
      </Camera>
    );
  }
}

class CancelButton extends Component{
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
    alignItems: 'center',
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },

  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 15,
    width: 100,
    bottom: 10,
  },
  cancelButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#0097CE',
  },
});

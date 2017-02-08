/**
 * Created by kenny on 16/3/4.
 */
'use strict';

import React, {
    Component,
} from 'react';
import {
    Platform,
    View,
    ListView,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
    TouchableHighlight,
    TouchableOpacity,
    TextInput,
    Linking,
} from 'react-native';

import FramePage from './framepage';

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        var {navigator} = props;
        setTimeout(() => {
            navigator.replace({ name: 'FramePage', component: FramePage })
        }, 1000);
    }

    render() {
        return (
            <Image source={require('./images/hello_page.png') } style={styles.backgroundImage}/>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
        resizeMode: 'cover'
    }
});
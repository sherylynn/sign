'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator,
} from 'react-native';

import SplashScreen from './splash';
import codePush from 'react-native-code-push';
class sign extends Component {
    codePushStatusDidChange(status) {
        switch(status) {
            case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                console.log("Checking for updates.");
                break;
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                console.log("Downloading package.");
                break;
            case codePush.SyncStatus.INSTALLING_UPDATE:
                console.log("Installing update.");
                break;
            case codePush.SyncStatus.UP_TO_DATE:
                console.log("Up-to-date.");
                break;
            case codePush.SyncStatus.UPDATE_INSTALLED:
                console.log("Update installed.");
                break;
        }
    }
    codePushDownloadDidProgress(progress) {
        console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
    }
    render() {
        var defaultName = 'Splash';
        var defaultComponent = SplashScreen;

        return (
            <Navigator
                initialRoute={{ name: defaultName, component: defaultComponent }}
                configureScene={(route) => {
                    //return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
                    return Navigator.SceneConfigs.FloatFromBottom;
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator} />
                }}
            />
        );
    }
}
sign = codePush(sign);
AppRegistry.registerComponent('sign', () => sign);

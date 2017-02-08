
import React, { AppRegistry, Component, View, Text } from 'react-native';

import Markdown from 'react-native-showdown';

class Example extends Component {
    render() {
        var markdown = '# Welcome to React Native!\n\nTo get started, edit index.android.js\n\nShake or press menu button for dev menu\n百度:http://www.baidu.com';
        return <Markdown body={ markdown } />
    }
}

AppRegistry.registerComponent('meihu', () => Example);
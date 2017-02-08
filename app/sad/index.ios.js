var React=require('react-native');
var Home=require('./views/home');
var About=require('./views/about');
var Manager=require('./views/manager');
var Message=require('./views/message');
var Util=require('./views/util');
var Service=require('./views/service');
var {
  StyleSheet,
  View,
  TabBarIOS,
  Text,
  NavigatorIOS,
  AppRegistry,
  Image,
  TextInput,
  StatusBarIOS,
  ScrollView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  AsyncStorage
}= React;

StatusBarIOS.setStyle('light-content');
var Address=React.createClass({
    statics: {
        title: '主页',
        description: '选项卡'
    },
    getInitialState: function () {
        return {
            selectedTab: 'home',
            showIndex: {
                height: 0,
                opacity: 0
            },
            showLogin: {
                flex: 1,
                opacity: 1
            },
            isLoadingShow: false
        };
    },
    componentDidMount: function () {
        var that = this;
        AsyncStorage.getItem('token', function (err, token) {
            if (!err && token) {
                var path = Service.host + Service.loginByToken;
                Util.post(path, {token: token}, function (data) {
                    if (data.state) {
                        that.setState({
                            showLogin: {
                                height: 0,
                                width: 0,
                                flex: 0
                            },
                            showIndex: {
                                flex: 1,
                                opacity: 1
                            },
                            isLoadingShow: false
                        });
                    } else {
                        that.setState({
                            showIndex: {
                                height: 0,
                                opacity: 0
                            },
                            showLogin: {
                                flex: 1,
                                opacity: 1
                            },
                            isLoadingShow: false
                        });
                    }
                });
            }
        });
        var path = Service.host + Service.getMessave;
        var that = this;
        Util.post(path, {
            key: Util.key
        }, function (data) {
            that.setState({
                data: data
            });
        });
    },
    _selectTab: function (tabName) {
        this.setState({
            selectedTab: tabName
        });
    },
    _addNavigator: function (component, title) {
        var data = null;
        if (title === '公告') {
            data = this.state.data;
        }
        return <NavigatorIOS
            style={{flex:1}}
            barTintColor='#007AFF'
            titleTextColor='#fff'
            tintColor='#fff'
            translucent={false}
            initialRoute={{
                component:component,
                title:title,
                passProps:{
                  data:data
                }
            }}/>;
    },
    _getEmail: function (val) {
        var email = val;
        this.setState({
            email: email
        });
    },
    _getPassword: function (val) {
        var password = val;
        this.setState({
            password: password
        });
    },
    _login: function () {
        var email = this.state.email;
        var password = this.state.password;
        var path = Service.host + Service.login;
        var that = this;
        that.setState({
            showLogin: {
                height: 0,
                width: 0,
                flex: 0
            },
            isLoadingShow: true
        });
        Util.post(path, {
            email: email,
            password: password,
            deviceId: 'qwerty789',
        }, function (data) {
            if (data.state) {
                var user = data.data;
                AsyncStorage.multiSet([
                    ['username', user.username],
                    ['token', user.token],
                    ['userid', user.userid],
                    ['email', user.email],
                    ['tel', user.tel],
                    ['partment', user.partment],
                    ['tag', user.tag]
                ], function (err) {
                    if (!err) {
                        that.setState({
                            showLogin: {
                                height: 0,
                                width: 0,
                                flex: 0
                            },
                            showIndex: {
                                flex: 1,
                                opacity: 1
                            },
                            isLoadingShow: false
                        });
                    }
                });
            } else {
                AlertIOS.alert('login', 'name or password is error');
                that.setState({
                    showIndex: {
                        height: 0,
                        width: 0,
                        flex: 0
                    },
                    showLogin: {
                        flex: 1,
                        opacity: 1
                    },
                    isLoadingShow: false
                });
            }
        });
    },

    render: function () {
        return (
            <View style={{flex:1}}>
                {this.state.isLoadingShow ?
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <ActivityIndicatorIOS size="small" color="#268DFF">

                        </ActivityIndicatorIOS>
                    </View> : null
                }
                {!this.state.isLoadingShow ?
                    <View style={this.state.showIndex}>
                        <TabBarIOS barTintColor="#FFF">
                            <TabBarIOS.Item
                                icon={require('image!phone_s')}
                                title="首页"
                                selected={this.state.selectedTab==='home'}
                                onPress={this._selectTab.bind(this,'home')}
                            >
                                {this._addNavigator(Home, '主页')}
                            </TabBarIOS.Item>
                            <TabBarIOS.Item
                                icon={require('image!gonggao')}
                                title='公告'
                                selected={this.state.selectedTab==='message'}
                                onPress={this._selectTab.bind(this,'message')}
                            >
                                {this._addNavigator(Message, '公告')}
                            </TabBarIOS.Item>
                            <TabBarIOS.Item
                                title='管理'
                                icon={require('image!manager')}
                                selected={this.state.selected==='manager'}
                                onPress={this._selectTab.bind(this,'manager')}
                            >
                                {this._addNavigator(Manager, '管理')}
                            </TabBarIOS.Item>
                            <TabBarIOS.Item
                                icon={require('image!about')}
                                title="管理"
                                selected={this.state.selected==='about'}
                                onPress={this._selectTab.bind(this.'about')}
                            >
                                {this._addNavigator(About, '关于')}
                            </TabBarIOS.Item>
                        </TabBarIOS>
                    </View> : null
                }
                <ScrollView style={[this.state.showLogin]}>
                    <View style={styles.container}>
                        <View>
                            <Image style={styles.logo} source={require('image!logo')}>
                            </Image>
                        </View>
                        <View style={styles.inputRow}>
                            <Text>
                                邮箱
                            </Text>
                            <TextInput style={styles.input}
                                       placeholde="请输入邮箱"
                                       onChangeText={this._getEmail}/>
                        </View>
                        <View style={styles.inputRow}>
                            <Text>
                                密码
                            </Text>
                            <TextInput style={styles.input}
                                       placeholde="请输入密码"
                                       onChangeText={this._getPassword}/>
                        </View>
                        <View>
                            <TouchableHighlight underlayColor="#fff" style={style.btn}
                                                onPress={this._login}>
                                <Text style={{color:'#fff'}}>登录</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
});

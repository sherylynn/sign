var React=require('react-native');
var Header=require('./header.js');
var {
  AppRegistry,
  StyleSheet,
  View,
  Text
} = React;

var List =React.createClass({
  render:function(){
    return (
      <View style={styles.list_item}>
        <Text style={styles.list_item_font}>{this.props.title}</Text>
      </View>
    )
  }
});

var ImportantNews=React.createClass({
  show:function(title){
    alert(title);
  },
  render:function(){
    var news=[];
    for (var i in this.props.news){
      var text=(
        <Text
          onPress={this.show.bind(this,this.props.news[i])}
          numberOfLines={2}
          style={styles.news_items}>
          {this.props.news[i]}
        </Text>
      );
      news.push(text);
    }
    return (
      <View style={styles.flex}>
        <Text style={styles.news_title}>今日要闻</Text>
        {news}
      </View>
    )
  }
})

var app = React.createClass({
  render: function(){
    return (
      <View style={styles.flex}>
        <Header></Header>
        <List title='第一条'></List>
        <List title='第二条'></List>
        <List title='第三条'></List>
        <List title='第四条'></List>
        <ImportantNews news={[
            '1.today is a good day',
            '2.tomorrow is a good day',
            '3.byebye lovellbyebye lovellbyebye lovellbyebye lovellbyebye lovellbye lovellbyebye lovellbyebye lovellbyebye lovellbyebye lovell'
          ]}>
        </ImportantNews>
      </View>
    );
  }
});

var styles=StyleSheet.create({
  flex:{
    flex:1
  },
  list_item:{
    height:40,
    marginLeft:10,
    marginRight:10,
    borderBottomWidth:1,
    borderBottomColor:'#ddd',
    justifyContent:'center'
  },
  list_item_font:{
    fontSize:16
  },
  news_title:{
    fontSize:20,
    fontWeight:'bold',
    color:'#CD1D1C',
    marginLeft:10,
    marginTop:15,
  },
  news_item:{
    marginLeft:10,
    marginRight:10,
    fontSize:15,
    lineHeight:20,
  }
});

AppRegistry.registerComponent('meihu', () => app);

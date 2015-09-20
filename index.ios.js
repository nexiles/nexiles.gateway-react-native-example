/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var gateway = require("./app/gateway");

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;


var NexilesGatewayExample = React.createClass({
  getInitialState: function() {
    return {
      version: {
        version: "unknown",
        build: "unknown",
        date: "unknown"
      },
      results: []
    }
  },
  componentDidMount: function() {
    var me = this;
    gateway.version().then(function (version) {
      console.debug("version.version: ", version.version);
      me.setState({version: version});
    });
    gateway.query("epmdocuments", {name: "*.asm"}).then(function (data) {
      console.debug("results data: ", data);
      me.setState({results: data.items});
    });
  },
  render: function() {
    var results = [];
    for (let res of this.state.results) {
      console.debug("res= %o", res);
      results.push(
        <Text key={res.oid}>
          {res.name}
        </Text>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Gateway version {this.state.version.version} build {this.state.version.build} date {this.state.version.date}
        </Text>
        {results}
      </View>
    );
  }
});

var styles = StyleSheet.create({
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

AppRegistry.registerComponent('NexilesGatewayExample', () => NexilesGatewayExample);

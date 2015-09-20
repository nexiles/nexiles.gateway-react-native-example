/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var gateway = require("./app/gateway");
var query = require("./app/query");

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var QueryResults = require("./app/QueryResults");


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
    query.query({name: "01*.prt"}).then(function (data) {
      console.debug("results data: ", data);
      me.setState({results: data.items});
    });
  },
  render: function() {
    console.debug("RENDER: ", this.state.results.length);
    return (
      <QueryResults style={styles.container}
                    items={this.state.results} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
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

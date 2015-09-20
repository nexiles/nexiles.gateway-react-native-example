'use strict';

var React = require('react-native');
var {
  AppRegistry,
  TouchableHighlight,
  PropTypes,
  StyleSheet,
  Image,
  ListView,
  Text,
  View,
} = React;

var gateway = require("./gateway");

function getThumbImageURL(reps) {
	for (let rep of reps) {
		console.debug("rep: %o", rep);
		if (rep.role == "THUMBNAIL") {
			return rep.url;
		}
	}

	return "http://lorempixel.com/100/200";
}

var QueryResults = React.createClass({

	propTypes: {
		items: PropTypes.array.isRequired
	},

	getInitialState: function() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return {
			ds: ds
		};
	},

	render: function() {
	    console.debug("LV RENDER: ", this.props.items.length);

	    var dataSource = this.state.ds.cloneWithRows(this.props.items);
		return (
			<ListView style={this.props.style}
			     dataSource={dataSource}
				  renderRow={this._renderRow}
				/>
		)
	},

	_pressRow: function(rowId) {

	},

	_renderRow: function(rowData: string, sectionID: number, rowID: number) {
		var imgSource = {
			uri: getThumbImageURL(rowData.representations)
		};


		console.debug("%s %s", rowID, rowData.name);

		return (
			<TouchableHighlight onPress={() => this._pressRow(rowID)}>
				<View>
					<View style={styles.row}>
						<Image style={styles.thumb} source={imgSource} />
						<Text style={styles.cadname}>
							{rowData.CADName}
						</Text>
						<Text style={styles.state}>
							{rowData.state}
						</Text>
					</View>
				<View style={styles.separator} />
				</View>
			</TouchableHighlight>
			);
	},

});

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  thumb: {
    width: 64,
    height: 64,
    paddingLeft: 8,
  },
  cadname: {
    flex: 2,
  },
  state: {
    flex: 1,
  },
});


module.exports = QueryResults;
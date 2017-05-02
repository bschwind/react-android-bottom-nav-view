"use strict";

var React = require("react");
var PropTypes = React.PropTypes;
var View = require("View");
var StyleSheet = require("StyleSheet");

class BottomNavTab extends React.Component {

	static propTypes = {
		...View.propTypes,
		iconName: PropTypes.string,
		title: PropTypes.string
	};

	render() {
		return (
			<View style={{flex: 1}}>
				{ this.props.children }
			</View>
		);
	}
}

var styles = StyleSheet.create({

});

module.exports = BottomNavTab;

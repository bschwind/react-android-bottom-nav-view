"use strict";

var React = require("react");
var PropTypes = React.PropTypes;
var View = require("View");
var StyleSheet = require("StyleSheet");
var requireNativeComponent = require("requireNativeComponent");

var BottomNavigationTab = {};

class BottomNav extends React.Component {
	static Item = BottomNavigationTab;

	static propTypes = {
		...View.propTypes,
		selectedIndex: PropTypes.number,
		selectedItemId: PropTypes.number
	};

	constructor(props) {
		super(props);

		// TODO - this logic should be centralized (and is it enumerating children in the correct order?)
		var tabs = React.Children.toArray(props.children).map((c) => {
			return {
				id: c.key,
				title: c.props.title,
				iconName: c.props.iconName
			};
		});

		this.state = {
			tabs: tabs
		};
	}

	getInitialState() {
		return {
			selectedItemId: 0,
			selectedIndex: 0, // TODO - remove this
			tabs: []
		}
	}

	componentWillReceiveProps(nextProps) {
		var tabs = React.Children.toArray(nextProps.children).map((c) => {
			return {
				id: c.key, // TODO - is the best thing to use for an id?
				title: c.props.title,
				iconName: c.props.iconName
			};
		});

		this.setState({
			tabs: tabs
		});
	}

	componentDidMount() {
		console.log("Root Mounted!");
	}

	getActiveChild() {
		var children = React.Children.toArray(this.props.children);

		if (children[this.state.selectedIndex]) {
			return children[this.state.selectedIndex];
		}
	}

	render() {
		return (
			<View style={{flex: 1, backgroundColor: "white", flexDirection: "column", justifyContent: "flex-end"}}>
				<View style={{flex: 1}}>
				{ this.getActiveChild() }
				</View>
				<RCTBottomNav
					style={ [styles.tabGroup, this.props.style] }
					tabs={ this.state.tabs }
					onTabChange ={ (event) => {
						console.log(event.nativeEvent.newTabIndex);
						this.setState({
							selectedItemId: event.nativeEvent.selectedItemId
						});
					} } >
				</RCTBottomNav>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	tabGroup: {
		height: 56
	}
});

var RCTBottomNav = requireNativeComponent("RCTBottomNav", BottomNav, {
	nativeOnly: { tabs: true }
});

module.exports = BottomNav;

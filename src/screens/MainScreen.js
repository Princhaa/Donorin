import React, { Component } from 'react'
import { TabNavigator, TabBarBottom } from 'react-navigation'

import metrics from '../config/metrics'

import Events from './Events'
import ScanQR from './ScanQR'
import ProfileComponent from './ProfileComponent'

const MainScreen = TabNavigator({
	Events: { screen: Events },
	ScanQR: { screen: ScanQR },
	Profile: { screen: ProfileComponent }
}, {
	lazy: true,
	tabBarOptions: {
		activeTintColor: metrics.COLOR_ACCENT,
		inactiveTintColor: '#909090',
		style: {
			backgroundColor: 'white',
			height: 48,
			elevation: 2,
			borderTopWidth: 1,
			borderTopColor: metrics.COLOR_ACCENT,
		},
		indicatorStyle: {
			backgroundColor: 'white',
		},
		tabStyle: {
			padding: 5,
		},
		upperCaseLabel: false,
	},
	tabBarComponent: TabBarBottom,
	tabBarPosition: 'bottom',
	animationEnabled: false,
	swipeEnabled: false
})

class Main extends Component {

	static navigationOptions = {
		header: null
	}

	componentDidMount() {
	}

	render() {
		return(
			<MainScreen screenProps={this.props.navigation} />
		)
	}
}

export default Main
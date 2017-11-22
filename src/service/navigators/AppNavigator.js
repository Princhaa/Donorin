import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import { bindActionCreators } from 'redux'
import ActionCreators from '../action'

import metrics from '../../config/metrics'

import LoginScreen from '../../screens/LoginScreen'
import RegisterScreen from '../../screens/RegisterScreen'

const App = StackNavigator({
	Login: { screen: LoginScreen },
	Register: { screen: RegisterScreen }
}, {
	initialRouteName: 'Login',
	navigationOptions: {
		headerTintColor: 'white',
		headerStyle: {
			backgroundColor: metrics.COLOR_PRIMARY
		},
		headerTitleStyle: {
			color: 'white'
		}
	}
})

export const AppNavigator = connect(mapStateToProps)(App)

class AppWithNavigationState extends Component {
	render() {
		this.navHelper = addNavigationHelpers({
			dispatch: this.props.dispatch,
			state: this.props.nav,
			...bindActionCreators(ActionCreators, this.props.dispatch)
		})

		return (
			<AppNavigator 
				// navigation={this.navHelper}
				screenProps={{
					...this.props
				}}
			/>
		)
	}
}

AppWithNavigationState.propTypes = {
	dispatch: PropTypes.func.isRequired,
	nav: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	nav: state.nav
})

export default connect(mapStateToProps)(AppWithNavigationState)
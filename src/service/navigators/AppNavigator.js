import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import { bindActionCreators } from 'redux'
import ActionCreators from '../action'

import metrics from '../../config/metrics'

import LoginScreen from '../../screens/LoginScreen'
import RegisterScreen from '../../screens/RegisterScreen'
import MainScreen from '../../screens/MainScreen'
import EditProfile from '../../screens/EditProfile'
import ChangePassword from '../../screens/ChangePassword'
import RequestBlood from '../../screens/RequestBlood'
import AdminMain from '../../screens/AdminMain'
import NewEvent from '../../screens/NewEvent'

const App = StackNavigator({
	Login: { screen: LoginScreen },
	Register: { screen: RegisterScreen },
	Main: { screen: MainScreen },
	EditProfile: { screen: EditProfile },
	ChangePassword: { screen: ChangePassword },
	RequestBlood: { screen: RequestBlood },
	AdminMain: { screen: AdminMain },
	NewEvent: { screen: NewEvent }
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
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import { bindActionCreators } from 'redux'
import ActionCreators from '../action'

import metrics from '../../config/metrics'

import LoginComponent from '../../screens/LoginComponent'
import RegisterComponent from '../../screens/RegisterComponent'
import MainScreen from '../../screens/MainScreen'
import EditProfileComponent from '../../screens/EditProfileComponent'
import ChangePassword from '../../screens/ChangePassword'
import RequestBlood from '../../screens/RequestBlood'
import AdminMain from '../../screens/AdminMain'
import AddEventComponent from '../../screens/AddEventComponent'
import Scan from '../../screens/Scan'

const App = StackNavigator({
	Login: { screen: LoginComponent },
	Register: { screen: RegisterComponent },
	Main: { screen: MainScreen },
	EditProfile: { screen: EditProfileComponent },
	ChangePassword: { screen: ChangePassword },
	RequestBlood: { screen: RequestBlood },
	AdminMain: { screen: AdminMain },
	AddEvent: { screen: AddEventComponent },
	Scan: { screen: Scan }
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
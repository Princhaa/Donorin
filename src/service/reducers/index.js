import { combineReducers } from 'redux'
import { NavigationActions } from 'react-navigation'
import { AppNavigator } from '../navigators/AppNavigator'

//Start with two routes: The Main screen, with the Login screen on top
const tempNavState = AppNavigator.router.getStateForAction(NavigationActions.reset({
	index: 0,
	actions: [
		NavigationActions.navigate({
			routeName: 'Login',
		}),
	],
}))
const secondAction = AppNavigator.router.getActionForPathAndParams('Login')
const initialNavState = AppNavigator.router.getStateForAction(
	secondAction,
	tempNavState
)

function nav(state = initialNavState, action) {
	let nextState
	switch(action.type) {
	case 'Login':
		nextState = AppNavigator.router.getStateForAction(
			NavigationActions.back(),
			state
		)
		break
	case 'Logout':
		nextState = AppNavigator.router.getStateForAction(
			NavigationActions.navigate({ routeName: 'Login' }),
			state
		)
		break
	default:
		nextState = AppNavigator.router.getStateForAction(action, state)
		break
	}

	//Simply return the original state if nextState is null or undefined
	return nextState || state
}

const initialAuthState = { isLoggedIn: false, token: null }

function auth(state = initialAuthState, action) {
	switch (action.type) {
	case 'Login': 
		return { ...state, isLoggedIn: true }
	case 'Logout':
		return { ...state, isLoggedIn: false }
	case 'Token':
		return { ...state, token: action.token }
	default: 
		return state
	}
}

function userData(state = null, action) {
	switch(action.type) {
	case 'UserData' :
		return action.userData
	default:
		return state
	}
}

const AppReducer = combineReducers({
	nav,
	auth,
	userData
})

export default AppReducer
import { NavigationActions } from 'react-navigation'

export function back() {
	return dispatch => dispatch(NavigationActions.back())
}

export function openPage(routeName, params = {}) {
	return dispatch => dispatch(NavigationActions.navigate({ routeName, params }))
}
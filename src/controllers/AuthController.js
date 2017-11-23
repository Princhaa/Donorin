import { Alert } from 'react-native'

import { store } from '../../App'
import { 
	login,
	register
} from '../service/APIRequest/API'
import action from '../service/action'

const loginController = async (email, password) => {
	let response = await login(email, password)
	if (response.ok) {
		response = await response.json()
		store.dispatch(action.setUserData(response.user))
		store.dispatch(action.setToken(response.token))
		return response
	} else {
		Alert.alert('Error', response.status.toString())
	}
}

const registerController = async (email, password, passwordConfirm) => {
	if (password != passwordConfirm) {
		Alert.alert('Error', 'Password doesn\'t match')
	} else {
		let response = await register(email, password, passwordConfirm)
		if (response.ok) {
			Alert.alert('Berhasil', 'Registrasi berhasil! Silahkan login')
		} else {
			Alert.alert('Error', response.status.toString())
		}
	}
}

const logoutController = () => {
	store.dispatch(action.login())
}

module.exports = {
	loginController,
	registerController,
	logoutController
}
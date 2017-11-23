import { Alert } from 'react-native'

import { store } from '../../App'
import { 
	post
} from '../service/APIRequest/API'
import action from '../service/action'

const login = async (email, password) => {
	let response = await post('/login', { 
		email: email,
		password: password
	})
	if (response.ok) {
		response = await response.json()
		store.dispatch(action.setUserData(response.user))
		store.dispatch(action.setToken(response.token))
		return response
	} else {
		Alert.alert('Error', response.status.toString())
	}
}

const register = async (dataRegistrasi) => {
	if (dataRegistrasi.password != dataRegistrasi.passwordConfirm) {
		Alert.alert('Error', 'Password doesn\'t match')
	} else {
		let response = await post('/register', {
			email: dataRegistrasi.email,
			password: dataRegistrasi.password,
			passwordConfirmation: dataRegistrasi.passwordConfirmation,
		})
		if (response.ok) {
			Alert.alert('Berhasil', 'Registrasi berhasil! Silahkan login')
		} else {
			Alert.alert('Error', response.status.toString())
		}
	}
}

const deleteToken = () => {
	store.dispatch(action.login())
}

module.exports = {
	login,
	register,
	deleteToken
}
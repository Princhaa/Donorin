import { Alert } from 'react-native'
import firebase from 'react-native-firebase'

import { store } from '../../App'
import { 
	post
} from '../service/APIRequest/API'
import action from '../service/action'

class AuthController {
	login = async (email, password) => {
		let response = await post('/login', { 
			email: email,
			password: password,
			fcm_token: await firebase.messaging().getToken()
		})
		if (response.ok) {
			response = await response.json()
			store.dispatch(action.setUserData(response.user))
			store.dispatch(action.setToken(response.token))
			return response
		} else {
			Alert.alert('Error', response.status.toString())
			return null
		}
	}
	
	register = async (dataRegistrasi) => {
		console.log(dataRegistrasi)
		if (dataRegistrasi.password != dataRegistrasi.passwordConfirm) {
			Alert.alert('Error', 'Password doesn\'t match')
		} else {
			let response = await post('/register', {
				email: dataRegistrasi.email,
				password: dataRegistrasi.password,
				passwordConfirmation: dataRegistrasi.passwordConfirm,
			})
			if (response.ok) {
				Alert.alert('Berhasil', 'Registrasi berhasil! Silahkan login')
				return true
			} else {
				Alert.alert('Error', response.status.toString())
				return false
			}
		}
	}
	
	deleteToken = () => {
		store.dispatch(action.login())
	}
}

export default new AuthController()
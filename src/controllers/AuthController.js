import { Alert, AsyncStorage } from 'react-native'
import firebase from 'react-native-firebase'

import { store } from '../../App'
import Controller from './Controller'
import action from '../service/action'

class AuthController extends Controller {
	login = async (email, password) => {
		let response = await this.api.post('/login', { 
			email: email,
			password: password,
			fcm_token: await firebase.messaging().getToken()
		})
		if (response.ok) {
			response = await response.json()
			store.dispatch(action.setUserData(response.user))
			store.dispatch(action.setToken(response.token))
			AsyncStorage.setItem('userData', JSON.stringify(response))
			return response
		} else {
			Alert.alert('Error', 'Email dan password tidak ditemukan')
			return null
		}
	}
	
	register = async (dataRegistrasi) => {
		if (dataRegistrasi.password != dataRegistrasi.passwordConfirm) {
			Alert.alert('Error', 'Password doesn\'t match')
		} else {
			let response = await this.api.post('/register', {
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

	getUserSession = async () => {
		let userData = await AsyncStorage.getItem('userData')
		if (userData) {
			userData = JSON.parse(userData)
			await store.dispatch(action.setUserData(userData.user))
			await store.dispatch(action.setToken(userData.token))
			return userData.user.tipe
		} else {
			return false
		}
	}
	
	deleteToken = () => {
		store.dispatch(action.login())
	}
}

export default new AuthController()
import { Alert } from 'react-native'
import Controller from './Controller'

class UserListController extends Controller {
	getUsers = async (token) => {
		let response = await this.api.get('/users', {
			'Authorization': 'Bearer '+token
		})
		if (response.ok) {
			return await response.json()
		} else {
			Alert.alert('Error', 'Periksa koneksi anda')
			return null
		}
	}
}

export default new UserListController()
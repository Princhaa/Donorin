import { Alert } from 'react-native'
import Controller from './Controller'

class HistoryController extends Controller {
	getHistory = async (token) => {
		let response = await this.api.get('/profile/history', {
			'Authorization': 'Bearer '+token
		})
		if (response.ok) {
			return await response.json()
		} else {
			Alert.alert('Pemberitahuan', 'Cek koneksi anda')
			return []
		}
	}
}

export default new HistoryController
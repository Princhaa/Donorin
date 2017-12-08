import { Alert } from 'react-native'
import Controller from './Controller'

class EventController extends Controller {
	addEvent = async (eventData, token) => {
		let response = await this.api.post('/event', eventData, {
			'Authorization': 'Bearer ' + token
		})
		return response
	}

	getEvents = async (latitude, longitude, token) => {
		let response = await this.api.get(`/event?lokasi=${latitude},${longitude}`, {
			'Authorization': 'Bearer '+token
		})
		if (response.ok) {
			return await response.json()
		} else {
			Alert.alert('Pemberitahuan', 'Cek koneksi anda')
		}
	}
}

export default new EventController()
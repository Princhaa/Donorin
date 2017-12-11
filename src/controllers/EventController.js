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

	deleteEvent = async (eventId, token) => {
		let response = await this.api.post('/event/delete', {
			'id': eventId
		}, {
			'Authorization': 'Bearer '+token
		})
		if (response.ok) {
			return await response.json()
		} else {
			Alert.alert('Error', response.message)
			return null
		}
	}
}

export default new EventController()
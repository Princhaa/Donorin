import {
	post,
	get
} from '../service/APIRequest/API'

import { Alert } from 'react-native'

class EventController{
	addEvent = async (eventData, token) => {
		let response = await post('/event', {
			eventData
		}, {
			'Authorization': 'Bearer ' + token
		})
		return response
	}

	getEvents = async (latitude, longitude, token) => {
		let response = await get(`/event?lokasi=${latitude},${longitude}`, {
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
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

	requestBlood = async (dataForm, latitude, longitude, token) => {
		return await post('/request', {
			nama: dataForm.name,
			telepon: dataForm.phone,
			rumah_sakit: dataForm.hospital,
			golongan_darah: dataForm.selectedBlood,
			rhesus: dataForm.selectedRhesus,
			lokasi: latitude+','+longitude
		}, {
			'Authorization': 'Bearer '+token
		})
	}
}

export default new EventController()
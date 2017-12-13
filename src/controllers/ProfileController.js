import { Alert } from 'react-native'

import { store } from '../../App'
import Controller from './Controller'
import action from '../service/action'

class ProfileController extends Controller {
	editProfile = async (dataIdentitas, token) => {
		let response = await this.api.post('/profile', {
			nama: dataIdentitas.name,
			telepon: dataIdentitas.phone,
			alamat: dataIdentitas.location,
			tanggal_lahir: dataIdentitas.birthday,
			golongan_darah: dataIdentitas.selectedBlood,
			terakhir_donor: dataIdentitas.lastDonor,
			rhesus: dataIdentitas.selectedRhesus
		}, {
			'Authorization': 'Bearer '+token
		})
		if (response.ok) {
			response = await response.json()
			store.dispatch(action.setUserData(response))
			return response
		} else {
			console.log(response)
			Alert.alert('Error', response.status.toString())
			return null
		}
	}
}

export default new ProfileController()
import { Alert } from 'react-native'

import { store } from '../../App'
import {
	editProfile
} from '../service/APIRequest/API'
import action from '../service/action'

const editProfileController = async (name, phone, location, birthday, selectedBlood, lastDonor, token) => {
	let response = await editProfile(name, phone, location, birthday, selectedBlood, lastDonor, token)	
	if (response.ok) {
		response = await response.json()
		store.dispatch(action.setUserData(response))
		return response
	} else {
		Alert.alert('Error', response.status.toString())
		return null
	}
}

module.exports = {
	editProfileController
}
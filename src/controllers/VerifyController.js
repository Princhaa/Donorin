import { Alert } from 'react-native'

import Controller from './Controller'

class VerifyController extends Controller {
	readqr = async (qrcode, token) => {
		let response = await this.api.post('/validate', {
			data: qrcode
		}, {
			'Authorization': 'Bearer '+token
		})
		if (response.ok) {
			Alert.alert('Pemberitahuan', 'Berhasil melakukan donor!')
		} else {
			Alert.alert('Pemberitahuan', 'QR Code tidak valid')
		}
	}
}

export default new VerifyController()
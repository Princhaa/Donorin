import {
	post
} from '../service/APIRequest/API'

class RequestController {
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

export default new RequestController()
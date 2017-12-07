import Controller from './Controller'

class RequestController extends Controller {
	requestBlood = async (dataForm, latitude, longitude, token) => {
		return await this.api.post('/request', {
			nama: dataForm.name,
			telepon: dataForm.phone,
			rumah_sakit: dataForm.hospital,
			golongan_darah: dataForm.selectedBlood,
			rhesus: dataForm.selectedRhesus,
			lokasi: latitude+','+longitude,
			alamat: dataForm.location
		}, {
			'Authorization': 'Bearer '+token
		})
	}
}

export default new RequestController()
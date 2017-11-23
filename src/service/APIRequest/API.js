import metrics from '../../config/metrics'

const login = async (email, password, token) => {
	return await fetch(metrics.BASE_URL + '/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: email,
			password: password,
			fcm_token: 'token'
		})
	})
}

const register = async (email, password, passwordConfirm) => {
	return await fetch(metrics.BASE_URL + '/register', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			email: email,
			password: password,
			passwordConfirmation: passwordConfirm
		})
	})
}

const editProfile = async (name, phone, location, birthday, blood, lastDonor, rhesus, token) => {
	return await fetch(metrics.BASE_URL + '/profile', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			'Authorization': 'Bearer ' + token
		},
		body: JSON.stringify({
			nama: name,
			telepon: phone,
			alamat: location,
			tanggal_lahir: birthday,
			golongan_darah: blood,
			terakhir_donor: lastDonor,
			rhesus: rhesus
		})
	})
}

const post = async (route, params, header) => {
	return await fetch(metrics.BASE_URL + route, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			...header
		},
		body: JSON.stringify(params)
	})
}

const get = async (route, header) => {
	return await fetch(metrics.BASE_URL + route, {
		method: 'GET',
		headers: {
			...header
		}
	})
}

module.exports = {
	login,
	register,
	editProfile,
	post,
	get
}
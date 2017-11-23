import metrics from '../../config/metrics'

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
	post,
	get
}
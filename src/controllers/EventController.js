import {
	post
} from '../service/APIRequest/API'

const addEvent = async (eventData, token) => {
	let response = await post('/event', {
		eventData
	}, {
		'Authorization': 'Bearer ' + token
	})
	return response
}

module.exports = {
	addEvent
}
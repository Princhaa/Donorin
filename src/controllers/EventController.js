import {
	post
} from '../service/APIRequest/API'

class EventController{
	addEvent = async (eventData, token) => {
		let response = await post('/event', {
			eventData
		}, {
			'Authorization': 'Bearer ' + token
		})
		return response
	}
}

export default new EventController()
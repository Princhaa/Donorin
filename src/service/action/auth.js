export function login() {
	return {
		type: 'Login'
	}
}

export function setToken(token) {
	return {
		type: 'Token',
		token
	}
}
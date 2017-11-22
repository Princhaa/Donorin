import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import AppReducer from './src/service/reducers'
import AppWithNavigationState from './src/service/navigators/AppNavigator'

const middlewares = [thunkMiddleware]
if(__DEV__){
	const logger = createLogger()
	middlewares.push(logger)
}

function configureStores(initialState) {
	const enhancer = compose(applyMiddleware(...middlewares))
	return createStore(AppReducer, initialState, enhancer)
}

export const store = configureStores({})

class DonorinApp extends Component {
	

	render() {
		return (
			<Provider store={store}>
				<AppWithNavigationState />
			</Provider>
		)
	}
}

export default DonorinApp
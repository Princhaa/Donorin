import React, { Component } from 'react'
import { View, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import RNGooglePlaces from 'react-native-google-places'
import moment from 'moment'
import { connect } from 'react-redux'

import FloatingButton from '../components/FloatingButton'
import EventItem from '../components/EventItemAdmin'
import metrics from '../config/metrics'
import EventController from '../controllers/EventController'

class AdminMain extends Component {

	static navigationOptions = {
		title: 'Donorin',
		headerLeft: null,
		isDataLoaded: false,
		events: null
	}

	async componentDidMount() {
		let places = await RNGooglePlaces.getCurrentPlace()
		let { latitude, longitude } = await places[0]
		let events = await EventController.getEvents(latitude, longitude, this.props.token)
		this.setState({ events: events, isDataLoaded: true })
	}

	renderList() {
		if (this.state.isDataLoaded) {
			return(
				<FlatList 
					data={this.state.events}
					renderItem={({ item }) => {
						return (
							<EventItem 
								date={moment(item.waktu).format('DD MMM')}
								place={item.nama}
								address={item.alamat}
								time={moment(item.waktu).format('HH:MM')}
							/>
						)
					}}
					keyExtractor={(item) => item.id}					
				/>
			)
		} else {
			return (
				<ActivityIndicator />
			)
		}
	}

	render() {
		return(
			<View style={styles.container}>
				<Image source={require('../../assets/header.jpg')} style={styles.header}/>
				<FloatingButton style={styles.floatingButton} onPress={() => this.props.navigation.navigate('AddEvent')} />
				<View style={styles.content}>
					{this.renderList()}
				</View>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	header: {
		position: 'absolute',
		top: 0,
		width: metrics.DEVICE_WIDTH,
		resizeMode: 'cover',
		height: 150
	},

	content: {
		flex: 1,
		width: metrics.DEVICE_WIDTH * 0.95,
		backgroundColor: 'white',
		elevation: 5,
		marginTop: metrics.DEVICE_HEIGHT * 0.15,
		zIndex: 1,
		paddingVertical: 20,
		shadowColor: 'rgba(184, 184, 184, 0.5)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 4,
		shadowOpacity: 1,
	},

	floatingButton: {
		width: 50,
		height: 50,
		position: 'absolute',
		bottom: 10,
		elevation: 6,
		zIndex: 2,
		shadowColor: 'rgba(184, 184, 184, 0.5)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 4,
		shadowOpacity: 1,
	}
})

const mapStateToProps = (state) => {
	return {
		token: state.auth.token
	}
}

export default connect(mapStateToProps)(AdminMain)
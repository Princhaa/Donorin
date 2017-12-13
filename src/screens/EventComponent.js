import React, { Component } from 'react'
import { View, StyleSheet, Image, FlatList, ActivityIndicator, Text, Alert } from 'react-native'
import RNGooglePlaces from 'react-native-google-places'
import moment from 'moment'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import FloatingButton from '../components/FloatingButton'
import EventItem from '../components/EventItemAdmin'
import metrics from '../config/metrics'
import EventController from '../controllers/EventController'
import CustomButton from '../components/CustomButton'
import AuthController from '../controllers/AuthController'

const logout = NavigationActions.reset({
	index: 0,
	actions: [
		NavigationActions.navigate({ routeName: 'Login' })
	]
})

class EventComponent extends Component {

	static navigationOptions = {
		title: 'Donorin',
		headerLeft: null
	}

	constructor(props){
		super(props)
		this.state = {
			isDataLoaded: false,
			events: null
		}
	}

	async componentDidMount() {
		let place
		try {
			let places = await RNGooglePlaces.getCurrentPlace()
			place = await places[0]
		} catch(err) {
			place = {
				latitude: -7.95372210,
				longitude: 112.61457060
			}
		}
		let events = await EventController.getEvents(place.latitude, place.longitude, this.props.token)
		this.setState({ events: events, isDataLoaded: true })
	}

	async deleteEvent(eventId) {
		Alert.alert(
			'Hapus',
			'Apakah anda yakin untuk menghapus event ini?',
			[
				{text: 'Tidak', onPress: () => {}, style: 'cancel'},
				{text: 'Ya', onPress: async () => {
					let response = await EventController.deleteEvent(eventId, this.props.token)
					if (response) {
						this.setState({ isDataLoaded: false })
						this.componentDidMount()
					}
				}},
			],
			{ cancelable: false }
		)
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
								onPress={() => this.deleteEvent(item.id)}
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

	async logout() {
		await AuthController.deleteToken()
		this.props.navigation.dispatch(logout)
	}

	render() {
		return(
			<View style={styles.container}>
				<Image source={require('../../assets/header.jpg')} style={styles.header}/>
				<FloatingButton style={styles.floatingButton} onPress={() => this.props.navigation.navigate('AddEvent')} />
				<View style={styles.content}>
					{this.renderList()}
				</View>
				<CustomButton style={styles.button} onPress={() => this.props.navigation.navigate('UserList')}>
					<Text style={styles.buttonText}>Daftar Pengguna</Text>
				</CustomButton>
				<CustomButton style={styles.logout} onPress={() => this.logout()}>
					<Text style={styles.buttonText}>Logout</Text>
				</CustomButton>
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
	},

	buttonText: {
		color: 'white'
	},

	button: {
		width: metrics.DEVICE_WIDTH * 0.45,
		backgroundColor: metrics.COLOR_PRIMARY,
		position: 'absolute',
		top: 20,
		right: 10
	},

	logout: {
		width: metrics.DEVICE_WIDTH * 0.45,
		backgroundColor: metrics.COLOR_PRIMARY,
		position: 'absolute',
		top: 20,
		left: 10
	}
})

const mapStateToProps = (state) => {
	return {
		token: state.auth.token
	}
}

export default connect(mapStateToProps)(EventComponent)
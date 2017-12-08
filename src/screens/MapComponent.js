import React, { Component } from 'react'
import { View, StyleSheet, Text, Linking } from 'react-native'
import  { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MapView from 'react-native-maps'
import RNGooglePlaces from 'react-native-google-places'

import metrics from '../config/metrics'
import EventController from '../controllers/EventController'

class MapComponent extends Component {

	static navigationOptions = {
		tabBarIcon: ({ focused }) => {
			return (
				<Icon name={'map'} size={20} color={focused ? metrics.COLOR_PRIMARY : '#909090'}/>				
			)
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			events: null,
			isDataLoaded: false
		}
	}

	async getPlaces(latitude, longitude) {
		let events = await EventController.getEvents(latitude, longitude, this.props.token)
		this.setState({ events: events, isDataLoaded: true })
	}

	async componentDidMount() {
		let places = await RNGooglePlaces.getCurrentPlace()
		let { latitude, longitude } = await places[0]
		await this.getPlaces(latitude, longitude)
	}

	renderMarker() {
		if (this.state.isDataLoaded) {
			return this.state.events.map(marker => {
				return (
					<MapView.Marker 
						coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
						pinColor={metrics.COLOR_PRIMARY}
					>
						<MapView.Callout onPress={() => Linking.openURL(`http://maps.google.com/maps?daddr=${marker.latitude},${marker.longitude}`)}>
							<View style={{ backgroundColor: 'white', padding: 10 }}>
								<Text style={{ color: 'black' }}>{marker.alamat}</Text>
							</View>
						</MapView.Callout>
					</MapView.Marker>
				)
			})
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<MapView 
					showsMyLocationButton={true}
					showsUserLocation={true}
					style={{ ...StyleSheet.absoluteFillObject }}
					provider={'google'}
				>
					{this.renderMarker()}
				</MapView>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

const mapStateToProps = (state) => {
	return {
		token: state.auth.token
	}
}

export default connect(mapStateToProps)(MapComponent)
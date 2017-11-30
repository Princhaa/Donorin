import React, { Component } from 'react'
import { View, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import RNGooglePlaces from 'react-native-google-places'
import { connect } from 'react-redux'
import moment from 'moment'

import FloatingButton from '../components/FloatingButton'
import EventItem from '../components/EventItem'
import metrics from '../config/metrics'
import EventController from '../controllers/EventController'

class EventListComponent extends Component {

	constructor(props) {
		super(props)
		this.state = {
			events: null,
			isDataLoaded: false
		}
	}

	static navigationOptions = {
		tabBarIcon: ({ focused }) => {
			return (
				<Icon name={'event'} size={20} color={focused ? metrics.COLOR_PRIMARY : '#909090'}/>
			)
		}
		
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
				<FloatingButton style={styles.floatingButton} onPress={() => this.props.screenProps.navigate('RequestComponent')} />
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
		height: 150,
		zIndex: 0
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
		zIndex: 2
	}
})

const mapStateToProps = (state) => {
	return {
		token: state.auth.token
	}
}

export default connect(mapStateToProps)(EventListComponent)
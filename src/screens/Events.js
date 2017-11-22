import React, { Component } from 'react'
import { View, StyleSheet, Image, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import FloatingButton from '../components/FloatingButton'
import EventItem from '../components/EventItem'
import metrics from '../config/metrics'

export default class Events extends Component {

	static navigationOptions = {
		tabBarIcon: ({ focused }) => {
			return (
				<Icon name={'event'} size={20} color={focused ? metrics.COLOR_PRIMARY : '#909090'}/>
			)
		}
		
	}

	render() {
		return(
			<View style={styles.container}>
				<Image source={require('../../assets/header.jpg')} style={styles.header}/>
				<FloatingButton style={styles.floatingButton} onPress={() => this.props.screenProps.navigate('RequestBlood')} />
				<View style={styles.content}>
					<FlatList 
						data={metrics.DUMMY_EVENT_DATA}
						renderItem={({ item }) => {
							return (
								<EventItem 
									date={item.date}
									place={item.place}
									address={item.address}
									time={item.time}
								/>
							)
						}}
					/>
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
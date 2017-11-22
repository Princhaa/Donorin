import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const EventItem = ({ date, place, address, time, ...otherProps }) => (
	<TouchableOpacity style={styles.container} {...otherProps}>
		<View style={{ flex: 1, flexDirection: 'row' }}>
			<View style={{ flex: 2, justifyContent: 'center' }}>
				<Text style={[styles.text, { fontSize: 10 }]}>{date}</Text>
				<Text style={[styles.text, { fontSize: 15 }]}>{place}</Text>
				<Text style={styles.text}>{address}</Text>
			</View>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
				<Text style={styles.text}>{time}</Text>
			</View>
		</View>
	</TouchableOpacity>
)

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		elevation: 6.5,
		flex: 1,
		height: 100,
		marginVertical: 10,
		marginHorizontal: 20,
		padding: 10,
		shadowColor: 'rgba(184, 184, 184, 0.5)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 4,
		shadowOpacity: 1,
	},

	text: {
		marginVertical: 5,
		color: 'black'
	},
	
})

export default EventItem
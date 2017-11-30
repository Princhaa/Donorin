import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const EventItemAdmin = ({ date, place, address, time, ...otherProps }) => (
	<View style={styles.container} {...otherProps}>
		<View style={{ flex: 1, flexDirection: 'row' }}>
			<View style={{ flex: 2, justifyContent: 'center' }}>
				<Text style={[styles.text, { fontSize: 10 }]}>{date}</Text>
				<Text style={[styles.text, { fontSize: 15 }]}>{place}</Text>
				<Text style={styles.text}>{address}</Text>
			</View>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
				<Text style={styles.text}>{time}</Text>
			</View>
			<TouchableOpacity style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
				<Icon name={'md-trash'} color={'red'} size={20}/>
			</TouchableOpacity>
		</View>
	</View>
)

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		elevation: 6.5,
		height: 130,
		marginVertical: 10,
		marginHorizontal: 20,
		padding: 10,
		paddingVertical: 20,
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

export default EventItemAdmin
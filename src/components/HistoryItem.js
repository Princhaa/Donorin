import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import metrics from '../config/metrics'

const HistoryItem = ({ date, place, address, time, ...otherProps }) => (
	<TouchableOpacity style={styles.container} {...otherProps}>
		<View style={{ flex: 1, flexDirection: 'row' }}>
			<View style={{ flex: 2, justifyContent: 'center' }}>
				<Text style={[styles.text, { fontSize: 10 }]}>{date}</Text>
				<Text style={[styles.text, { fontSize: 15 }]}>{place}</Text>
				<Text style={styles.text}>{address}</Text>
			</View>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', paddingVertical: 20 }}>
				<View style={styles.label}>
					<Text style={[styles.text, { color: 'white', fontSize: 12 }]}>label</Text>
				</View>
				<Text>{time}</Text>
			</View>
		</View>
	</TouchableOpacity>
)

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		elevation: 6.5,
		height: 100,
		width: metrics.DEVICE_WIDTH * 0.9,
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

	label: {
		backgroundColor: metrics.COLOR_PRIMARY,
		borderRadius: 5,
		width: 50,
		height: 15,
		position: 'absolute',
		top: 0,
		justifyContent: 'center',
		alignItems: 'center',
	}
	
})

export default HistoryItem
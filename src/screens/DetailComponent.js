import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import metrics from '../config/metrics'
import CustomButton from '../components/CustomButton'

export default class DetailComponent extends Component {

	static navigationOptions = {
		title: 'Detail'
	}

	render() {
		return(
			<View style={styles.container}>
				<View style={styles.card}>
					<Text style={styles.text}>Ananta Pratama</Text>
					<Text style={styles.text}>081330747579</Text>
					<Text style={styles.text}>Rumah Sakit Permata Bunda</Text>
					<Text style={styles.text}>Jl. Permata</Text>
					<CustomButton style={styles.button}>
						<Text style={styles.buttonText}>Buka Lokasi</Text>
					</CustomButton>
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

	card: {
		backgroundColor: 'white',
		elevation: 5,
		padding: 20,
		width: metrics.DEVICE_WIDTH * 0.9
	},
	
	buttonText: {
		color: 'white'
	},

	button: {
		marginTop: 20,
		width: metrics.DEVICE_WIDTH * 0.8,
		backgroundColor: metrics.COLOR_PRIMARY
	},

	text: {
		color: 'black',
		marginVertical: 5
	}
})
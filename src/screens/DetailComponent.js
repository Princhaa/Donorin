import React, { Component } from 'react'
import { View, StyleSheet, Text, Linking } from 'react-native'

import metrics from '../config/metrics'
import CustomButton from '../components/CustomButton'

export default class DetailComponent extends Component {

	static navigationOptions = {
		title: 'Detail'
	}

	render() {
		const { nama, rumah_sakit, latitude, longitude, alamat, telepon } = this.props.navigation.state.params
		return(
			<View style={styles.container}>
				<View style={styles.card}>
					<Text style={styles.text}>{nama}</Text>
					<Text style={styles.text}>{telepon}</Text>
					<Text style={styles.text}>{rumah_sakit}</Text>
					<Text style={styles.text}>{alamat}</Text>
					<CustomButton style={styles.button} onPress={() => Linking.openURL(`http://maps.google.com/maps?daddr=${latitude},${longitude}`)}>
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
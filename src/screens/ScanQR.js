import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Camera from 'react-native-camera'

import metrics from '../config/metrics'


export default class ScanQR extends Component {

	static navigationOptions = {
		tabBarIcon: ({ focused }) => {
			return (
				<Icon size={20} name={'qrcode-scan'} color={focused ? metrics.COLOR_PRIMARY : '#909090'}/>
			)
		}
	}

	render() {
		return(
			<View style={styles.container}>
				<Camera 
					style={styles.camera}
					aspect={Camera.constants.Aspect.fill}
				/>
				<Text style={styles.text}>Scan dan dapatkan point untuk ditukarkan hadiah!</Text>
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

	text: {
		color: 'black',
		position: 'absolute',
		bottom: 30
	},

	camera: {
		width: metrics.DEVICE_WIDTH * 0.8,
		height: metrics.DEVICE_WIDTH * 0.8
	}
})
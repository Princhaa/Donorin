import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

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
				<Image source={require('../../assets/qr.png')} style={{ width: 300, height: 300, resizeMode: 'contain' }}/>
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
	}
})
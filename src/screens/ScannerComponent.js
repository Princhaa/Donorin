import React, { Component } from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Camera from 'react-native-camera'
import { connect } from 'react-redux'

import VerifyController from '../controllers/VerifyController'
import metrics from '../config/metrics'

class ScannerComponent extends Component {

	static navigationOptions = {
		tabBarIcon: ({ focused }) => {
			return (
				<Icon size={20} name={'qrcode-scan'} color={focused ? metrics.COLOR_PRIMARY : '#909090'}/>
			)
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			isQRCaptured: false
		}
	}

	async scanQR(data) {
		this.setState({ isQRCaptured: true })
		await VerifyController.readqr(data.data, this.props.token)
		this.setState({ isQRCaptured: false })
	}

	render() {
		return(
			<View style={styles.container}>
				{this.state.isQRCaptured ? <ActivityIndicator color={metrics.COLOR_PRIMARY} size={'large'}/> : 
					<Camera
						style={styles.camera}
						aspect={Camera.constants.Aspect.fill}
						onBarCodeRead={(data) => {
							this.scanQR(data)
						}}
					/>
				}
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

const mapStateToProps = (state) => {
	return {
		token: state.auth.token
	}
}

export default connect(mapStateToProps)(ScannerComponent)
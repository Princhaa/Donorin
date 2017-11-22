import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import CustomButton from '../components/CustomButton'
import CustomTextInput from '../components/CustomTextInput'
import metrics from '../config/metrics'

export default class ChangePassword extends Component {

	static navigationOptions = {
		title: 'Edit Profile'
	}

	render() {
		return(
			<View style={styles.container}>
				<View style={styles.center}>
					<CustomTextInput style={styles.textInput} placeholder={'Password Lama'} secureTextEntry={true}>
						<Icon name={'vpn-key'} size={20} style={{ margin: 5, alignSelf: 'center' }}/>
					</CustomTextInput>
					<CustomTextInput style={styles.textInput} placeholder={'Password Baru'} secureTextEntry={true}>
						<Icon name={'vpn-key'} size={20} style={{ margin: 5, alignSelf: 'center' }}/>
					</CustomTextInput>
					<CustomTextInput style={styles.textInput} placeholder={'Konfirmasi Password Baru'} secureTextEntry={true}>
						<Icon name={'vpn-key'} size={20} style={{ margin: 5, alignSelf: 'center' }}/>
					</CustomTextInput>
					<CustomButton style={styles.button} onPress={() => this.props.navigation.goBack(null)}>
						<Text style={styles.buttonText}>Edit</Text>
					</CustomButton>
				</View>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	},

	center: {
		justifyContent: 'center',
		alignItems: 'center'
	},

	textInput: {
		marginVertical: 5,
		backgroundColor: 'white',
		paddingHorizontal: 5,
		borderRadius: 5,
		height: 50,
		width: metrics.DEVICE_WIDTH * 0.9,
		justifyContent: 'center',
		flexDirection: 'row'
	},

	buttonText: {
		color: 'white'
	},

	button: {
		width: metrics.DEVICE_WIDTH * 0.9,
		backgroundColor: metrics.COLOR_PRIMARY
	},

	radioItem: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row'
	},

	radioText: {
		marginLeft: 5,
		color: 'black'
	}
})
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import Icon from 'react-native-vector-icons/MaterialIcons'

import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton'
import metrics from '../config/metrics'
import { register } from '../controllers/AuthController'

import logo from '../../assets/logo.png'

class RegisterComponent extends Component {

	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			passwordConfirm: ''
		}
	}

	// async register() {
	// 	const { email, password, passwordConfirm } = this.state
	// 	let response = await register(email, password, passwordConfirm)
	// 	if (response.ok) {
	// 		Alert.alert('Berhasil', 'Registrasi berhasil')			
	// 	} else {
	// 		Alert.alert('Error', response.status)			
	// 	}
	// }

	async register(dataRegistrasi) {
		await register(dataRegistrasi)
	}

	render() {
		return (
			<TouchableWithoutFeedback style={{ flex: 1, backgroundColor: 'white' }} onPress={() => Keyboard.dismiss()}>
				<View style={styles.container}>
					<Image source={logo} style={{ marginVertical: 10 }}/>
					<CustomTextInput style={styles.textInput} placeholder={'Email'} keyboardType={'email-address'} ref={(ref) => this.emailRef = ref} onSubmitEditing={() => this.passwordRef.focus()} returnKeyType={'next'} onChangeText={(value) => this.setState({ email: value })}>
						<Icon name={'email'} size={20} style={{ margin: 5, marginRight: 10, alignSelf: 'center' }}/>
					</CustomTextInput>
					<CustomTextInput style={styles.textInput} placeholder={'Password'} secureTextEntry={true} ref={(ref) => this.passwordRef = ref} returnKeyType={'next'} onSubmitEditing={() => this.passwordConfRef.focus()} onChangeText={(value) => this.setState({ password: value })}>
						<Icon name={'vpn-key'} size={20} style={{ margin: 5, marginRight: 10, alignSelf: 'center' }}/>
					</CustomTextInput>
					<CustomTextInput style={styles.textInput} placeholder={'Konfirmasi password'} secureTextEntry={true} ref={(ref) => this.passwordConfRef = ref} returnKeyType={'done'} onChangeText={(value) => this.setState({ passwordConfirm: value })}>
						<Icon name={'vpn-key'} size={20} style={{ margin: 5, marginRight: 10, alignSelf: 'center' }}/>					
					</CustomTextInput>
					<CustomButton style={styles.button} onPress={() => this.register({ email: this.state.email, password: this.state.password, passwordConfirmation: this.state.passwordConfirm })}>
						<Text style={styles.buttonText}>Register</Text>
					</CustomButton>
					<KeyboardSpacer />
				</View>
			</TouchableWithoutFeedback>
		)
	}
}

RegisterComponent.propTypes = {
	navigation: PropTypes.object.isRequired
}

RegisterComponent.navigationOptions = {
	title: 'Register'
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		backgroundColor: 'white'
	},

	textInput: {
		marginVertical: 5,
		backgroundColor: 'white',
		paddingHorizontal: 5,
		borderRadius: 5,
		height: 50,
		width: metrics.DEVICE_WIDTH * 0.9,
		justifyContent: 'center',
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#ededed'
	},

	button: {
		width: metrics.DEVICE_WIDTH * 0.9,
		backgroundColor: metrics.COLOR_PRIMARY
	},

	socialButton: {
		marginHorizontal: 5,
		width: metrics.DEVICE_WIDTH * 0.45,		
	},

	buttonText: {
		color: 'white'
	},

	divider: {
		marginVertical: 5,
		backgroundColor: 'black',
		height: 1,
		width: metrics.DEVICE_WIDTH*0.8
	}
})

export default RegisterComponent
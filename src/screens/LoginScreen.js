import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback, Keyboard, Alert, StatusBar } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton'
import metrics from '../config/metrics'
import { store } from  '../../App'
import action from '../service/action'
import { login } from '../service/APIRequest/API'

import logo from '../../assets/logo.png'

class LoginScreen extends Component {

	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: ''
		}
	}
	
	async login() {
		let response = await login(this.state.email, this.state.password)
		if (response.ok) {
			response = await response.json()
			store.dispatch(action.setUserData(response.user))
			store.dispatch(action.setToken(response.token))
			if (response.user.tipe == 'admin') {
				this.props.navigation.navigate('AdminMain')
			}
			else if (response.dataLengkap) {
				this.props.navigation.navigate('Main')
			} else {
				this.props.navigation.navigate('EditProfile', { from: 'Login' })
			}
		} else {
			console.log(response)
			Alert.alert('Error', response.status.toString())
		}
	}

	render() {
		return (
			<TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
				<View style={styles.container}>
					<StatusBar 
						backgroundColor={metrics.COLOR_PRIMARY}
						barStyle={'light-content'}
					/>
					<Image source={logo} style={{ marginVertical: 10 }}/>
					<CustomTextInput style={styles.textInput} placeholder={'Email'} keyboardType={'email-address'} ref={(ref) => this.emailRef = ref} onSubmitEditing={() => this.passwordRef.focus()} returnKeyType={'next'} onChangeText={(value) => this.setState({ email: value })}>
						<Icon name={'email'} size={20} style={{ margin: 5, marginRight: 10, alignSelf: 'center' }}/>
					</CustomTextInput>
					<CustomTextInput style={styles.textInput} placeholder={'Password'} secureTextEntry={true} ref={(ref) => this.passwordRef = ref} returnKeyType={'done'} onChangeText={(value) => this.setState({ password: value })}>
						<Icon name={'vpn-key'} size={20} style={{ margin: 5, marginRight: 10, alignSelf: 'center' }}/>
					</CustomTextInput>
					<CustomButton style={styles.button} onPress={() => this.login()}>
						<Text style={styles.buttonText}>Login</Text>
					</CustomButton>
					<View style={styles.divider}/>
					<View>
						<Text style={{ color: 'black', marginVertical: 5 }} onPress={() => this.props.navigation.navigate('Register')}>Daftar disini</Text>
					</View>
					<KeyboardSpacer />
				</View>
			</TouchableWithoutFeedback>
		)
	}
}

LoginScreen.propTypes = {
	navigation: PropTypes.object.isRequired
}

LoginScreen.navigationOptions = {
	title: 'Log In'
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
		borderColor: '#ededed',
		borderWidth: 1,
		marginVertical: 5,
		backgroundColor: 'white',
		paddingHorizontal: 5,
		borderRadius: 5,
		height: 50,
		width: metrics.DEVICE_WIDTH * 0.9,
		justifyContent: 'center',
		flexDirection: 'row'
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
		width: metrics.DEVICE_WIDTH*0.9
	}
})

const mapStateToProps = (state) => {
	return {
		redux: state
	}
}

export default connect(mapStateToProps)(LoginScreen)
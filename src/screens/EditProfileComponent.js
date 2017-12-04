import React, { Component } from 'react'
import { View, Text, StyleSheet, DatePickerAndroid, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, DatePickerIOS, Button, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
// import RNGooglePlacePicker from 'react-native-google-place-picker'
import RNGooglePlaces from 'react-native-google-places'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'

import CustomButton from '../components/CustomButton'
import CustomTextInput from '../components/CustomTextInput'
import metrics from '../config/metrics'
import ProfileController from '../controllers/ProfileController'

class EditProfileComponent extends Component {

	constructor(props) {
		super(props)
		this.state = {
			name: null,
			phone: null,
			selectedBlood: 'A',
			selectedRhesus: '+',
			location: null,
			birthday: null,
			lastDonor: null,
			visibleModal: false,
			datepick: new Date(),
			activeDate: null
		}
	}

	static navigationOptions = {
		title: 'Edit Profile'
	}

	selectPlace() {
		RNGooglePlaces.openPlacePickerModal()
			.then((place) => {
				this.setState({ location: place.address })
			})
			.catch(error => console.log(error.message))  // error is a Javascript Error object
	}

	async updateProfile(dataIdentitas) {
		let response = await ProfileController.editProfile(dataIdentitas, this.props.token)
		if (response) {
			if (this.props.navigation.state.params) {
				this.props.navigation.navigate('Main')
			} else {
				this.props.navigation.goBack()
			}
		} else {
			Alert.alert('Error', 'Response is null')
		}
	}

	async openDate(field) {
		Keyboard.dismiss()
		if (metrics.OS == 'android') {
			try {
				let {action, year, month, day} = await DatePickerAndroid.open({
					// Use `new Date()` for current date.
					// May 25 2020. Month 0 is January.
					date: new Date()
				})
				if (action !== DatePickerAndroid.dismissedAction) {
					// Selected year, month (0-11), day
					if (day < 10) {
						day = '0'+day
					}
					if (field == 'birthday') {
						this.setState({ birthday: year + '-' + (month+1) + '-' + day })
					} else {
						this.setState({ lastDonor: year + '-' + (month+1) + '-' + day })				
					}
				}
			} catch ({code, message}) {
				console.warn('Cannot open date picker', message)
			}
		} else {
			this.setState({ visibleModal: true, activeDate: field })
		}
	}

	render() {
		return(
			<TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
				<ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
					<View style={styles.container}>
						<View style={styles.center}>
							<CustomTextInput style={styles.textInput} placeholder={'Nama'} onChangeText={(value) => this.setState({ name: value })} ref={(ref) => this.nameRef = ref} onSubmitEditing={() => this.phoneRef.focus()} returnKeyType={'next'}>
								<Icon name={'person'} size={20} style={{ margin: 5, alignSelf: 'center' }}/>
							</CustomTextInput>
							<CustomTextInput style={styles.textInput} placeholder={'Nomor Telepon'} keyboardType={'numeric'} onChangeText={(value) => this.setState({ phone: value })} ref={(ref) => this.phoneRef = ref} onSubmitEditing={() => this.addressRef.focus()} returnKeyType={'next'}>
								<Icon name={'local-phone'} size={20} style={{ margin: 5, alignSelf: 'center' }}/>
							</CustomTextInput>
							<CustomTextInput style={styles.textInput} placeholder={'Alamat'} value={this.state.location} onFocus={() => this.selectPlace()} ref={(ref) => this.addressRef = ref}>
								<Icon name={'place'} size={20} style={{ margin: 5, alignSelf: 'center' }}/>
							</CustomTextInput>
							<CustomTextInput style={styles.textInput} placeholder={'Tanggal Lahir'} value={this.state.birthday} onFocus={() => this.openDate('birthday')}>
								<MCI name={'calendar'} size={20} style={{ margin: 5, alignSelf: 'center' }}/>
							</CustomTextInput>
							<CustomTextInput style={styles.textInput} placeholder={'Donor terakhir'} value={this.state.lastDonor} onFocus={() => this.openDate('lastDonor')}>
								<MCI name={'calendar'} size={20} style={{ margin: 5, alignSelf: 'center' }}/>
							</CustomTextInput>
							<Text style={[styles.radioText, {  marginLeft: 30 ,marginVertical: 5, alignSelf: 'flex-start' }]}>Golongan darah</Text>
							<View style={{ flexDirection: 'row', marginVertical: 5 }}>
								<TouchableOpacity style={styles.radioItem} onPress={() => this.setState({ selectedBlood: 'A' })}>
									<Icon name={this.state.selectedBlood == 'A' ? 'radio-button-checked' : 'radio-button-unchecked'} color={metrics.COLOR_PRIMARY} size={20}/>
									<Text style={styles.radioText}>A</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.radioItem} onPress={() => this.setState({ selectedBlood: 'B' })}>
									<Icon name={this.state.selectedBlood == 'B' ? 'radio-button-checked' : 'radio-button-unchecked'} color={metrics.COLOR_PRIMARY} size={20}/>
									<Text style={styles.radioText}>B</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.radioItem} onPress={() => this.setState({ selectedBlood: 'O' })}>
									<Icon name={this.state.selectedBlood == 'O' ? 'radio-button-checked' : 'radio-button-unchecked'} color={metrics.COLOR_PRIMARY} size={20}/>
									<Text style={styles.radioText}>O</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.radioItem} onPress={() => this.setState({ selectedBlood: 'AB' })}>
									<Icon name={this.state.selectedBlood == 'AB' ? 'radio-button-checked' : 'radio-button-unchecked'} color={metrics.COLOR_PRIMARY} size={20}/>
									<Text style={styles.radioText}>AB</Text>
								</TouchableOpacity>
							</View>
							<Text style={[styles.radioText, {  marginLeft: 30 ,marginVertical: 5, alignSelf: 'flex-start' }]}>Rhesus darah</Text>
							<View style={{ flexDirection: 'row', marginVertical: 5 }}>
								<TouchableOpacity style={styles.radioItem} onPress={() => this.setState({ selectedRhesus: '+' })}>
									<Icon name={this.state.selectedRhesus == '+' ? 'radio-button-checked' : 'radio-button-unchecked'} color={metrics.COLOR_PRIMARY} size={20}/>
									<Text style={styles.radioText}>Positif</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.radioItem} onPress={() => this.setState({ selectedRhesus: '-' })}>
									<Icon name={this.state.selectedRhesus == '-' ? 'radio-button-checked' : 'radio-button-unchecked'} color={metrics.COLOR_PRIMARY} size={20}/>
									<Text style={styles.radioText}>Negatif</Text>
								</TouchableOpacity>
							</View>
							<CustomButton style={styles.button} onPress={() => this.updateProfile(this.state)}>
								<Text style={styles.buttonText}>Edit</Text>
							</CustomButton>
						</View>
						<Modal isVisible={this.state.visibleModal} style={styles.bottomModal}>
							<View style={styles.modalContent}>
								<DatePickerIOS 
									date={this.state.datepick}
									mode={'date'}
									onDateChange={(date) => {
										this.setState({ datepick: date })
										let day = date.getDate()
										if (day < 10) {
											day = '0'+day
										}
										if (this.state.activeDate == 'birthday') {
											this.setState({ birthday: date.getFullYear() + '-' + (date.getMonth()+1) + '-' + day })						
										} else {
											this.setState({ lastDonor: date.getFullYear() + '-' + (date.getMonth()+1) + '-' + day })
										}
									}}
								/>
								<Button 
									title={'Set'}
									color={metrics.COLOR_PRIMARY}
									onPress={() => this.setState({ visibleModal: false })}
								/>
							</View>
						</Modal>
					</View>
				</ScrollView>
			</TouchableWithoutFeedback>
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
	},

	bottomModal: {
		justifyContent: 'flex-end',
		margin: 0
	},

	modalContent: {
		backgroundColor: 'white',
		width: metrics.DEVICE_WIDTH,
		height: metrics.DEVICE_HEIGHT * 0.4,
		justifyContent: 'center'
	}
})

const mapStateToProps = (state) => {
	return {
		token: state.auth.token
	}
}

export default connect(mapStateToProps)(EditProfileComponent)
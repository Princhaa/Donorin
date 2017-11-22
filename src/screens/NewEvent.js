import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, DatePickerAndroid, Keyboard, DatePickerIOS } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
// import RNGooglePlacePicker from 'react-native-google-place-picker'
import RNGooglePlaces from 'react-native-google-places'
import Modal from 'react-native-modal'

import CustomButton from '../components/CustomButton'
import CustomTextInput from '../components/CustomTextInput'
import metrics from '../config/metrics'

export default class NewEvent extends Component {

	constructor(props) {
		super(props)
		this.state = {
			selectedBlood: 'A',
			selectedRhesus: 'positive',
			location: null,
			date: null,
			datepick: new Date(),
			visibleModal: false		
		}
	}

	static navigationOptions = {
		title: 'New Event'
	}

	async openDate() {
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
					this.setState({ date: year + '-' + (month+1) + '-' + day })				
				}
			} catch ({code, message}) {
				console.warn('Cannot open date picker', message)
			}
		} else {
			this.setState({ visibleModal: true })
		}
	}

	selectPlace() {
		// RNGooglePlacePicker.show((response) => {
		// 	if (response.didCancel) {
		// 		console.log('User cancelled GooglePlacePicker');
		// 	}
		// 	else if (response.error) {
		// 		console.log('GooglePlacePicker Error: ', response.error);
		// 	}
		// 	else {
		// 		this.setState({
		// 			location: response.address
		// 		})
		// 	}
		// })
		RNGooglePlaces.openPlacePickerModal()
			.then((place) => {
				this.setState({ location: place.address })
				// place represents user's selection from the
				// suggestions and it is a simplified Google Place object.
			})
			.catch(error => console.log(error.message))  // error is a Javascript Error object
	}

	render() {
		return(
			<View style={styles.container}>
				<View style={styles.center}>
					<CustomTextInput style={styles.textInput} placeholder={'Nama Event'}>
						<MCI name={'rename-box'} size={20} style={{ margin: 5, alignSelf: 'center' }}/>
					</CustomTextInput>
					<CustomTextInput style={styles.textInput} placeholder={'Tanggal Event'} value={this.state.date} onFocus={() => this.openDate()}>
						<MCI name={'calendar'} size={20} style={{ margin: 5, alignSelf: 'center' }}/>
					</CustomTextInput>
					<CustomTextInput style={styles.textInput} placeholder={'Waktu Event'}>
						<Icon name={'access-time'} size={20} style={{ margin: 5, alignSelf: 'center' }}/>
					</CustomTextInput>
					<CustomTextInput style={styles.textInput} placeholder={'Alamat'} value={this.state.location} onFocus={() => this.selectPlace()}>
						<Icon name={'place'} size={20} style={{ margin: 5, alignSelf: 'center' }}/>
					</CustomTextInput>
					<CustomButton style={styles.button} onPress={() => this.props.navigation.goBack(null)}>
						<Text style={styles.buttonText}>Submit</Text>
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
								this.setState({ date: date.getFullYear() + '-' + (date.getMonth()+1) + '-' + day })
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
import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, DatePickerAndroid, Keyboard, DatePickerIOS, TouchableWithoutFeedback, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import RNGooglePlaces from 'react-native-google-places'
import Modal from 'react-native-modal'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import moment from 'moment'
import { connect } from 'react-redux'

import CustomButton from '../components/CustomButton'
import CustomTextInput from '../components/CustomTextInput'
import metrics from '../config/metrics'
import { addEvent } from '../controllers/EventController'

class AddEventComponent extends Component {

	constructor(props) {
		super(props)
		this.state = {
			selectedBlood: 'A',
			selectedRhesus: 'positive',
			location: null,
			date: null,
			time: null,
			datepick: new Date(),
			visibleModal: false,
			dateType: 'date',
			selectedTime: null,
			name: null,
			coordinate: null
		}
	}

	static navigationOptions = {
		title: 'New Event'
	}

	normalizeDate(value) {
		if (value < 10) {
			return '0'+value
		} else {
			return value
		}
	}

	async addEvent() {
		let response = await addEvent({
			nama: this.state.name,
			alamat: this.state.address,
			waktu: this.state.selectedTime,
			lokasi: this.state.coordinate
		})
		if (response.ok) {
			Alert.alert('Pemberitahuan', 'Event berhasil dibuat')
		} else {
			Alert.alert('Pemberitahuan', 'Terjadi error')
			console.log(response)
		}
	}

	async openDate(type) {
		Keyboard.dismiss()
		if (metrics.OS == 'android') {
			try {
				let {action, year, month, day} = await DatePickerAndroid.open({
					date: new Date()
				})
				if (action !== DatePickerAndroid.dismissedAction) {
					month = this.normalizeDate(month)
					day = this.normalizeDate(day)
					this.setState({ date: year + '-' + (month+1) + '-' + day })				
				}
			} catch ({code, message}) {
				console.warn('Cannot open date picker', message)
			}
		} else {
			this.setState({ visibleModal: true, dateType: type })
			let date = new Date()
			let day = this.normalizeDate(date.getDate())
			let month = this.normalizeDate(date.getMonth())
			let hour = this.normalizeDate(date.getHours())
			let minute = this.normalizeDate(date.getMinutes())
			
			if (type == 'date') {
				this.setState({ date: date.getFullYear() + '-' + (month+1) + '-' + day })
			} else {
				this.setState({ time: hour + ':' + minute })
				this.formatDate()	
			}
		}
	}

	selectPlace() {
		RNGooglePlaces.openPlacePickerModal()
			.then((place) => {
				this.setState({ location: place.address, coordinate: place.latitude+','+place.longitude })
			})
			.catch(error => console.log(error.message))
	}

	formatDate() {
		let formattedDate = moment(this.state.date+' '+this.state.time, 'YYYY-MM-DD HH:MM')
		this.setState({ selectedTime: formattedDate })
	} 

	render() {
		return(
			<TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
				<View style={styles.container}>
					<View style={styles.center}>
						<CustomTextInput style={styles.textInput} placeholder={'Nama Event'} onChangeText={(value) => this.setState({ name: value })}>
							<MCI name={'rename-box'} size={20} style={{ margin: 5, alignSelf: 'center' }}/>
						</CustomTextInput>
						<CustomTextInput style={styles.textInput} placeholder={'Tanggal Event'} value={this.state.date} onFocus={() => this.openDate('date')}>
							<MCI name={'calendar'} size={20} style={{ margin: 5, alignSelf: 'center' }}/>
						</CustomTextInput>
						<CustomTextInput style={styles.textInput} placeholder={'Waktu Event'} value={this.state.time} onFocus={() => this.openDate('time')}>
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
								mode={this.state.dateType}
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
					<KeyboardSpacer />					
				</View>
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

export default connect(mapStateToProps)(AddEventComponent)
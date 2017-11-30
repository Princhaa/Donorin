import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, ScrollView, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import RNGooglePlaces from 'react-native-google-places'
import { connect } from 'react-redux'

import CustomButton from '../components/CustomButton'
import CustomTextInput from '../components/CustomTextInput'
import metrics from '../config/metrics'
import EventController from '../controllers/EventController'

class RequestComponent extends Component {

	constructor(props) {
		super(props)
		this.state = {
			selectedBlood: 'A',
			selectedRhesus: '+',
			location: null,
			name: null,
			phone: null,
			hospital: null,
			latlng: null
		}
	}

	static navigationOptions = {
		title: 'Request Blood'
	}

	selectPlace() {
		RNGooglePlaces.openPlacePickerModal()
			.then((place) => {
				this.setState({ location: place.address, latlng: place })
			})
			.catch(error => console.log(error.message))
	}

	async requestBlood() {
		let response = await EventController.requestBlood(this.state, this.state.latlng.latitude, this.state.latlng.longitude, this.props.token)
		if (response.ok) {
			Alert.alert('Pemberitahuan', 'Permintaan anda sedang diproses', [
				{
					text: 'OK',
					onPress:() => this.props.navigation.goBack(null)
				}
			])
		} else {
			console.log(response)
			Alert.alert('Pemberitahuan', 'Cek koneksi anda')
		}
	}

	render() {
		return(
			<TouchableOpacity style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
				<ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
					<View style={styles.container}>
						<View style={styles.center}>
							<CustomTextInput style={styles.textInput} placeholder={'Nama Pasien'} onChangeText={(value) => this.setState({ name: value })} ref={(ref) => this.nameRef = ref} onSubmitEditing={() => this.phoneRef.focus()} returnKeyType={'next'}>
								<Icon name={'person'} size={20} style={{ margin: 5, alignSelf: 'center' }}/>
							</CustomTextInput>
							<CustomTextInput style={styles.textInput} placeholder={'Nomor Telepon'} onChangeText={(value) => this.setState({ phone: value })} keyboardType={'numeric'} ref={(ref) => this.phoneRef = ref} onSubmitEditing={() => this.hospitalRef.focus()} returnKeyType={'next'}>
								<Icon name={'local-phone'} size={20} style={{ margin: 5, alignSelf: 'center' }}/>
							</CustomTextInput>
							<CustomTextInput style={styles.textInput} placeholder={'Nama Rumah Sakit'} onChangeText={(value) => this.setState({ hospital: value })} ref={(ref) => this.hospitalRef = ref} onSubmitEditing={() => this.placeRef.focus()} returnKeyType={'next'}>
								<MCI name={'needle'} size={20} style={{ margin: 5, alignSelf: 'center' }}/>
							</CustomTextInput>
							<CustomTextInput style={styles.textInput} placeholder={'Alamat'} value={this.state.location} onFocus={() => this.selectPlace()} ref={(ref) => this.placeRef = ref}>
								<Icon name={'place'} size={20} style={{ margin: 5, alignSelf: 'center' }}/>
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
							<CustomButton style={styles.button} onPress={() => this.requestBlood()}>
								<Text style={styles.buttonText}>Request</Text>
							</CustomButton>
						</View>
					</View>
				</ScrollView>
			</TouchableOpacity>
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

const mapStateToProps = (state) => {
	return {
		token: state.auth.token
	}
}

export default connect(mapStateToProps)(RequestComponent)
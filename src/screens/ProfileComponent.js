import React, { Component } from 'react'
import { View, StyleSheet, Text, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import MD from 'react-native-vector-icons/MaterialIcons'
import Ion from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { deleteToken } from '../controllers/AuthController'

import CustomButton from '../components/CustomButton'
import metrics from '../config/metrics'

class ProfileComponent extends Component {

	static navigationOptions = {
		tabBarIcon: ({ focused }) => {
			return (
				<MD name={'person'} size={20} color={focused ? metrics.COLOR_PRIMARY : '#909090'}/>
			)
		}
	}

	logout() {
		deleteToken()
		this.props.screenProps.navigate('Login')
	}

	render() {
		const { alamat, golongan_darah, nama, terakhir_donor, telepon } = this.props.userData
		return(
			<ScrollView style={{ flex: 1 }}>
				<View style={styles.container}>
					<StatusBar
						backgroundColor={metrics.COLOR_PRIMARY}
						barStyle="light-content"
					/>
					<View style={styles.header}/>
					<View style={styles.summary}>
						<View style={[styles.center, { paddingTop: 20 }]}>
						</View>
						<View style={styles.center}>
							<Image source={require('../../assets/ava.png')} style={{ width: 100, height: 100, flex: 1 }}/>
						</View>
						<View style={[styles.center, { paddingTop: 20, flexDirection: 'row', marginTop: 20 }]}>
							<Icon name={'drop'} color={metrics.COLOR_PRIMARY} size={20}/>
							<Text style={styles.red}>300</Text>
						</View>
					</View>
					<View style={{ alignItems: 'center', marginTop: 5 }}>
						<Text style={{ color: 'black', fontSize: 20 }}>{nama}</Text>
					</View>
					<View style={styles.card}>
						<View style={{ flexDirection: 'row', height: 100, marginBottom: 10 }}>
							<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', backgroundColor: metrics.COLOR_ACCENT, padding: 10 }}>
								<Text style={styles.white}>Donor Terakhir</Text>
								<Text style={[styles.white, { fontSize: 17.5, marginTop: 5 }]}>{terakhir_donor}</Text>
							</View>
							<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', backgroundColor: metrics.COLOR_PRIMARY, padding: 10 }}>
								<Text style={styles.white}>Donor Selanjutnya</Text>
								<Text style={[styles.white, { fontSize: 17.5, marginTop: 5 }]}>30 Oktober 2017</Text>
							</View>
						</View>
						<Text style={styles.profileDetail}>Golongan Darah: {golongan_darah}</Text>
						<Text style={styles.profileDetail}>{alamat}</Text>
						<Text style={[styles.profileDetail, { marginBottom: 10 }]}>{telepon}</Text>
						<View style={styles.divider}/>
						<TouchableOpacity style={styles.buttons} onPress={() => this.props.screenProps.navigate('EditProfile')}>
							<Text style={{ flex: 1, color: 'black' }}>Ubah Profil</Text>
							<Ion name={'ios-arrow-forward'} size={20}/>
						</TouchableOpacity>
						<View style={styles.divider}/>
						<TouchableOpacity style={styles.buttons} onPress={() => this.props.screenProps.navigate('ChangePassword')}>
							<Text style={{ flex: 1, color: 'black' }}>Ubah Password</Text>
							<Ion name={'ios-arrow-forward'} size={20}/>
						</TouchableOpacity>
						<View style={styles.divider}/>						
						<TouchableOpacity style={styles.buttons} onPress={() => this.props.screenProps.navigate('ChangePassword')}>
							<Text style={{ flex: 1, color: 'black' }}>Riwayat</Text>
							<Ion name={'ios-arrow-forward'} size={20}/>
						</TouchableOpacity>
						<View style={styles.divider}/>
						<CustomButton style={styles.button} onPress={() => this.logout()}>
							<Text style={styles.buttonText}>Logout</Text>
						</CustomButton>
					</View>
				</View>
			</ScrollView>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	header: {
		width: metrics.DEVICE_WIDTH,
		height: metrics.DEVICE_HEIGHT * 0.15,
		backgroundColor: metrics.COLOR_PRIMARY,
		position: 'absolute',
		top: 0
	},

	summary: {
		flexDirection: 'row',
		marginTop: metrics.DEVICE_HEIGHT * 0.075,
		justifyContent: 'center',
		alignItems: 'center',
		height: 100
	},

	center: {
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center'
	},

	red: {
		color: metrics.COLOR_PRIMARY,
		fontSize: 20
	},

	white: {
		color: 'white'
	},

	card: {
		padding: 5,
		marginTop: 20,
		borderRadius: 2,
		backgroundColor: 'white',
		width: metrics.DEVICE_WIDTH * 0.95,
		elevation: 5,
		shadowColor: '#666',
		shadowRadius: 3,
		shadowOpacity: 1,
		shadowOffset: {
			width: 0,
			height: 3
		},
		alignSelf: 'center'
	},

	profileDetail: {
		marginVertical: 2,
		marginLeft: 10,
		color: 'black'
	},

	divider: {
		height: 1,
		width: metrics.DEVICE_WIDTH * 0.9,
		backgroundColor: 'grey',
		alignSelf: 'center',
		marginVertical: 5
	},

	buttons: {
		flexDirection: 'row',
		padding: 10,
		alignItems: 'center'
	},

	buttonText: {
		color: 'white'
	},

	button: {
		marginTop: 20,
		width: metrics.DEVICE_WIDTH * 0.9,
		backgroundColor: metrics.COLOR_PRIMARY
	},
})

const mapStateToProps = (state) => {
	return {
		userData: state.userData
	}
}

export default connect(mapStateToProps)(ProfileComponent)
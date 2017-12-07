import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import Modal from 'react-native-modal'

import HistoryItem from '../components/HistoryItem'
import HistoryController from '../controllers/HistoryController'
import metrics from '../config/metrics'

class HistoryComponent extends Component {

	static navigationOptions = {
		title: 'Riwayat Donor'
	}

	constructor(props) {
		super(props)
		this.state = {
			history: null,
			isLoading: true,
			isModalVisible: false,
			activeId: 0
		}
	}

	async componentDidMount() {
		let response = await HistoryController.getHistory(this.props.token)
		this.setState({ isLoading: false, history: response })
	}

	showModal(id) {
		this.setState({ isModalVisible: true, activeId: id })
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View style={[styles.container, { justifyContent: 'center' }]}>
					<ActivityIndicator color={metrics.COLOR_PRIMARY} size={'large'}/>
				</View>
			)
		} else {
			if (this.state.history.length > 0) {
				return (
					<View style={styles.container}>
						<FlatList 
							data={this.state.history}
							renderItem={({ item }) => 
								<HistoryItem 
									date={moment(item.createdAt).format('DD MMMM YYYY')}
									place={item.rumah_sakit}
									time={moment(item.createdAt).format('HH:MM')}
									type={item.type}
									onPress={() => this.showModal(item.id)}
								/>
							}
							keyExtractor={( item ) => item.id}
						/>
						<Modal isVisible={this.state.isModalVisible} style={{ alignItems: 'center' }}>
							<TouchableOpacity onPress={() => this.setState({ isModalVisible: false })}>
								<Image source={{ uri: metrics.BASE_URL+`/qr/request/${this.state.activeId}` }} style={styles.modalContent}/>
							</TouchableOpacity>
						</Modal>						
					</View>
				)
			} else {
				return (
					<View style={[styles.container, { justifyContent: 'center' }]}>
						<Text>Anda belum memiliki riwayat apapun</Text>
					</View>
				)
			}
		}
	}

}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},

	modalContent: {
		backgroundColor: 'white',
		padding: 22,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderColor: 'rgba(0, 0, 0, 0.1)',
		width: metrics.DEVICE_WIDTH * 0.8,
		height: metrics.DEVICE_WIDTH * 0.8
	},
})

const mapStateToProps = (state) => {
	return {
		token: state.auth.token
	}
}

export default connect(mapStateToProps)(HistoryComponent)
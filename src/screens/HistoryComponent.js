import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'

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
			isLoading: true
		}
	}

	async componentDidMount() {
		let response = await HistoryController.getHistory(this.props.token)
		this.setState({ isLoading: false, history: response })
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
							renderItem={({ item }) => {
								<HistoryItem 
									date={moment(item.createdAt).format('DD MMMM YYYY')}
									place={item.rumah_sakit}
									time={moment(item.createdAt).format('HH:MM')}
								/>
							}}
						/>
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
		alignItems: 'center',
		padding: 20
	}
})

const mapStateToProps = (state) => {
	return {
		token: state.auth.token
	}
}

export default connect(mapStateToProps)(HistoryComponent)
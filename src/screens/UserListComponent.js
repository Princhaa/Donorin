import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import UserListController from '../controllers/UserListControlller'
import metrics from '../config/metrics'

class UserListComponent extends Component {

	constructor(props){
		super(props)
		this.state = {
			data: null,
			isDataLoaded: false
		}
	}
	
	static navigationOptions = {
		title: 'Daftar Pengguna'
	}

	async componentDidMount() {
		let response = await UserListController.getUsers(this.props.token)
		if (response) {
			this.setState({ data: response, isDataLoaded: true })
		} else {
			this.setState({ isDataLoaded: true })
		}
	}

	renderList() {
		if (this.state.isDataLoaded) {
			if (this.state.data) {
				return (
					<FlatList 
						data={this.state.data}
						renderItem={({ item }) => 
							<View style={styles.item}>
								<Text style={styles.detail}>{item.nama}</Text>
								<Text style={styles.detail}>{item.email}</Text>
								<Text style={styles.detail}>{item.telepon}</Text>
								<Text style={styles.detail}>{item.terakhir_donor}</Text>
							</View>
						}
					/>
				)
			} else {
				return (
					<Text>Tidak ada data untuk ditampilkan</Text>
				)
			}
		} else {
			return (
				<ActivityIndicator color={metrics.COLOR_PRIMARY} size={'large'}/>
			)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{this.renderList()}
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},

	item: {
		backgroundColor: 'white',
		width: metrics.DEVICE_WIDTH * 0.9,
		height: 130,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: 'black',
		marginVertical: 1,
		padding: 10
	},

	detail: {
		color: 'black',
		marginVertical: 3
	}
})

const mapStateToProps = (state) => {
	return {
		token: state.auth.token
	}
}

export default connect(mapStateToProps)(UserListComponent)
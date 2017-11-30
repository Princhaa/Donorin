import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import HistoryItem from '../components/HistoryItem'

class HistoryComponent extends Component {

	static navigationOptions = {
		title: 'Riwayat Donor'
	}

	render() {
		return (
			<View style={styles.container}>
				<HistoryItem 
					date={'date'}
					place={'place'}
					address={'address'}
					time={'time'}
				/>
			</View>
		)
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
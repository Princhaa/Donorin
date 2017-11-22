import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import metrics from '../config/metrics'

const FloatingButton = ({ ...otherProps, style }) => (
	<TouchableOpacity {...otherProps} style={[styles.button, style]}>
		<Icon name={'drop'} color={'white'} size={20}/>
	</TouchableOpacity>
)

const styles = StyleSheet.create({
	button: {
		backgroundColor: metrics.COLOR_PRIMARY,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: 'rgba(184, 184, 184, 0.5)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 4,
		shadowOpacity: 1,
	}
})

export default FloatingButton
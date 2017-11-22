import React from 'react'
import { TouchableOpacity, TouchableNativeFeedback, StyleSheet, View } from 'react-native'

import metrics from '../config/metrics'

const CustomButton = ({ style, children, ...otherProps }) => {
	if (metrics.OS == 'ios') {
		return (
			<TouchableOpacity style={[styles.container, style]} {...otherProps}>
				{children}
			</TouchableOpacity>
		)
	} else {
		return (
			<TouchableNativeFeedback {...otherProps}>
				<View style={[styles.container, style]}>
					{children}
				</View>
			</TouchableNativeFeedback>
		)
	}
}

CustomButton.defaultProps = {
	style: {
		backgroundColor: 'white',	
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 5,
		borderRadius: 5
	}
})

export default CustomButton
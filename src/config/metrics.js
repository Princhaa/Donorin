import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

const dummyEventData = [
	{
		key: 1,
		date: '26 Oktober 2017',
		place: 'PMI Kota Batu',
		address: 'Jl. Kenangan Tak Terbatas RT 4 RW 12, Oro-oro Ombo',
		time: '07.00 - 09.00'
	},
	{
		key: 2,		
		date: '26 Oktober 2017',
		place: 'PMI Kota Batu',
		address: 'Jl. Kenangan Tak Terbatas RT 4 RW 12, Oro-oro Ombo',
		time: '07.00 - 09.00'
	},
	{
		key: 3,		
		date: '26 Oktober 2017',
		place: 'PMI Kota Batu',
		address: 'Jl. Kenangan Tak Terbatas RT 4 RW 12, Oro-oro Ombo',
		time: '07.00 - 09.00'
	}
]

export default{
	DEVICE_WIDTH: width,
	DEVICE_HEIGHT: height,
	OS: Platform.OS,
	FB_COLOR: 'rgb(60,90,150)',
	COLOR_PRIMARY: '#f44242',
	COLOR_ACCENT: '#ff7171',
	GOOGLE_COLOR: 'rgb(219,76,62)',
	DUMMY_EVENT_DATA: dummyEventData,
	BASE_URL: 'https://donorin.baruna.win'
}
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
const aspectRatio = height / width;
const threshold = aspectRatio > 1.6 ? 375 : 0;

export const dims = {
	marginStandard: width > threshold ? 30 : 15,
	get contentWidth () { 
			return width - 2 * dims.marginStandard 
	},
	buttonHeight: 75,
	// text stuff 
	textMarginL: width > threshold ? 20 : 10,
	textMarginS: 5,
	textSmall: width > threshold ? 16 : 14,
	textMedium: width > threshold ? 20 : 16,
	textLarge: width > threshold ? 20 : 18,
}

// COLORS
export const colors = {
	// blues
	darkBlue: '#69A6D7',
	lightBlue: '#E6F2FB',
	textBlue: '#306B9A',
	// greys
	lightGrey: '#727272',
	// accents
	alertRed: '#CD4747',
	alertGreen: '#69D794',
	offWhite: '#F7F7F7',
}

// STYLES
export const common = {

	// wrappers
	container: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: 'white',
	},
	paddedContainer: {
		flex: 1,
		padding: dims.marginStandard,
	},
	content: {
		flex: 4,
	},
	footer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginTop: dims.marginStandard,
		marginBottom: dims.marginStandard,
	},

	// text
	subtitle: {
		marginBottom: dims.textMarginS,
		fontSize: dims.textSmall,
		color: colors.lightGrey,
	},
	emphasis: {
		width: dims.contentWidth,
		marginBottom: dims.textMarginL,
		fontWeight: '600',
		fontSize: dims.textMedium,
	},
	spaced: {
		marginTop: dims.textMarginS,
		marginBottom: dims.textMarginS,
		fontSize: dims.textMedium,
	},

	// forms
	textField: {
		width: dims.contentWidth,
		marginTop: dims.textMarginS,
		marginBottom: dims.marginStandard,
		borderColor: '#979797', 
		borderWidth: 1,
		borderRadius: 5,
		padding: 10,
		fontSize: dims.textMedium,
	},
	multilineField: {
		// flex: 1,
		paddingTop: 12,
		textAlignVertical: 'top',
	},
	checkbox: {
		width: dims.contentWidth,
	},

	// buttons
	touchFull: {
		width: dims.contentWidth,
		height: dims.buttonHeight,
		borderRadius: 5,
		backgroundColor: colors.darkBlue,
	},
	touchHalf: {
		width: dims.contentWidth / 2 - 5, 
		height: dims.buttonHeight,
		borderRadius: 5, 
		backgroundColor: colors.darkBlue,
	},
};

import React from 'react';
import { Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');
const sideMargin = 15;
var maxWidth = width - 2 * sideMargin;

// COLORS
export const darkBlue = '#69A6D7';
export const lightGrey = '#727272';

// STYLES
export const common = {

    // wrappers
    container: {
        flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
        justifyContent: 'space-around',
    },
    paddedContainer: {
        flex: 1,
        padding: 15,
    },
    content: {
        flex: 4,
        alignItems: 'flex-start',
    },
	footer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginBottom: 15,
    },

    // text
    subtitle: {
        marginBottom: 5,
        fontSize: 14,
        color: '#727272',
    },
    emphasis: {
        width: maxWidth,
        marginBottom: 10,
        fontWeight: '600',
        fontSize: 18,
    },
    spaced: {
        marginTop: 5,
        marginBottom: 5,
		fontSize: 18,
	},

    // forms
    textField: {
        width: maxWidth,
        marginBottom: 15,
		borderColor: '#979797', 
		borderWidth: 1,
		borderRadius: 5,
		padding: 15,
		fontSize: 16
	},
	multilineField: {
		height: 150,
        paddingTop: 15,
    },
    checkbox: {
        width: maxWidth,
    },

    // buttons
    touchFull: {
        width: maxWidth,
        height: 80,
        borderRadius: 5,
        backgroundColor: darkBlue,
    },
    touchHalf: {
        margin: 5,
        width: maxWidth / 2 - 10, 
        height: 80,
        borderRadius: 5, 
        backgroundColor: darkBlue,
    },
};

// OBJECTS
export const navigator = {
    navBarLeftButtonColor: darkBlue,
    navBarRightButtonColor: darkBlue,
    navBarButtonColor: darkBlue,
};

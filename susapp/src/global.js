import React from 'react';
import { Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

export const dims = {
    sideMargin: 15,
    get contentWidth () { 
        return width - 2 * dims.sideMargin 
    },
    buttonHeight: height / 8,
}

// COLORS
export const colors = {
    darkBlue: '#69A6D7',
    lightBlue: '#E6F2FB',
    textBlue: '#306B9A',
    lightGrey: '#727272',
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
    },
    paddedContainer: {
        flex: 1,
        padding: dims.sideMargin,
    },
    content: {
        flex: 4,
        // alignItems: 'flex-start',
    },
	footer: {
		flex: 1,
		alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: dims.sideMargin,
		marginBottom: dims.sideMargin,
    },

    // text
    subtitle: {
        marginBottom: 5,
        fontSize: 14,
        color: colors.lightGrey,
    },
    emphasis: {
        width: dims.contentWidth,
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
        width: dims.contentWidth,
        marginBottom: dims.sideMargin,
		borderColor: '#979797', 
		borderWidth: 1,
		borderRadius: 5,
		padding: dims.sideMargin,
		fontSize: 16
	},
	multilineField: {
		height: 150,
        paddingTop: dims.sideMargin,
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

// OBJECTS
export const navigator = {
    navBarLeftButtonColor: colors.darkBlue,
    navBarRightButtonColor: colors.darkBlue,
    navBarButtonColor: colors.darkBlue,
};

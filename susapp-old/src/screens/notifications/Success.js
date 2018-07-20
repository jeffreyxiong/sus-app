import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../global';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: width,
        padding: 15,
        paddingTop: 35,
        backgroundColor: colors.alertGreen,
        alignItems: 'center',
    }

});

export default class Success extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style = { styles.container }>
                <Text style = {{ color: 'white', fontWeight: '600' }}>{this.props.text}</Text>
            </View>
        );
    }

}
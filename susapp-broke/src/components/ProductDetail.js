import React, { Component } from 'react';
import { Animated, Dimensions, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import { colors } from '../global';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    swiper: {
        flex: 3, 
        backgroundColor: colors.offWhite,
    },
    tabBar: {
        flex: 0,
        flexDirection: 'row',
        width: width,
        height: 60,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: width / 2,
        height: 60,
        borderBottomColor: colors.lightBlue,
        borderBottomWidth: 1.5,
    },
    label: {
        color: colors.darkBlue,
        fontWeight: '600',
    }, 
    labelActive: {
        color: colors.textBlue,
        fontWeight: '600',
    },
    tabActive: {
        // borderBottomColor: colors.textBlue,
    }
});

export default class ProductDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
        }
    }

    _handleScroll = (index) => {
        this.setState({ currentTab: index })
    }

    _handleTab = tab => {
        if (tab != this.state.currentTab) {
            var offset = this.state.currentTab > 0 ? -1 : 1;
            this.setState({ currentTab: this.state.currentTab + offset });
            this._swiper.scrollBy(offset);
        }
    }

    render() {
        return (
            <View style = { this.props.style }>
                <View style = { styles.tabBar }>
                    <TouchableOpacity onPress = { () => this._handleTab(0) } style = {[ styles.tab, this.state.currentTab == 0 && styles.tabActive ]}>
                        <Animated.Text style = {[ styles.label, this.state.currentTab == 0 && styles.labelActive ]}>DESCRIPTION</Animated.Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = { () => this._handleTab(1) } style = {[ styles.tab, this.state.currentTab == 1 && styles.tabActive ]}>
                        <Animated.Text style = {[ styles.label, this.state.currentTab == 1 && styles.labelActive ]}>DATA</Animated.Text>
                    </TouchableOpacity>
                </View>
                <Swiper loop = { false } 
                        showsPagination = { false }
                        onIndexChanged = { this._handleScroll }
                        // scrollEnabled = { false }
                        containerStyle = { styles.swiper }
                        ref = { (c) => { this._swiper = c; }}>
                    { this.props.children }
                </Swiper>
            </View>
        )
    }
}
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { startSurvey } from '../model/actions';
import { common } from '../global';
import TouchableBox from '../components/TouchableBox';

const styles = StyleSheet.create(common);

const mapStateToProps = (state) => ({
    state: state.data
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addParticipant: () => {
            ownProps.create((id, notes) => dispatch(startSurvey(id, notes)));
        }
    }
}

class AddParticipant extends Component {
    render() {
        const { addParticipant } = this.props;
        return (
            <TouchableBox
                onPress = { () => addParticipant() }
                disabled = { false }
                style = {[ styles.touchFull, { opacity : 1}]}
                textStyle = { {  color: "white" } }
                text = "Continue"
            />
        );
    }
}

AddParticipant = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddParticipant);

export default AddParticipant;
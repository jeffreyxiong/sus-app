import React, { Component } from 'react';
import { TextInput as RNTextInput } from 'react-native';

// Thanks to @kuhr on StackOverflow for thiss olution
// https://stackoverflow.com/questions/32748718/react-native-how-to-select-the-next-textinput-after-pressing-the-next-keyboar

export default class TextInput extends Component {
    render() {
        const { props } = this;

        return (
            <RNTextInput
                {...props}
                ref={(input) => props.inputRef && props.inputRef(input)}
            />
        );
    }
}
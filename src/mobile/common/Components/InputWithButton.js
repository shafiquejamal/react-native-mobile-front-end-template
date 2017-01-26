import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

import { Button, Spinner } from './';

class InputWithButton extends Component {

  renderButton(buttonIsLoading) {
    const { onButtonPress, buttonText } = this.props;

    if (buttonIsLoading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={onButtonPress}>
        {buttonText}
      </Button>
    );
  }

  render() {
    const {
      secureTextEntry,
      placeholder,
      value,
      onChangeText
    } = this.props;

    const { inputStyle, containerStyle } = styles;

    return (
      <View style={containerStyle}>
        <AutoGrowingTextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          style={inputStyle}
          value={value}
          onChangeText={onChangeText}
        />
      {this.renderButton(this.props.buttonIsLoading)}
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 4
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
};

const mapStateToProps = ({ chat }) => {
  const { buttonIsLoading } = chat;
  return { buttonIsLoading };
};

export default connect(mapStateToProps, {})(InputWithButton);

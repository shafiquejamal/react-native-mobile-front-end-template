import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import {
  updatePassword,
  updateCode } from '../../../web-mobile-common/access/actionGenerators';
import {
  resetPasswordThroughSocket,
  updateResetCodeError } from '../../../web-mobile-common/access/authentication/actionGenerators';

import {
  Card,
  CardSection,
  Input,
  Button,
  Spinner } from '../../common/Components';

class ResetPasswordForm extends Component {

  state = {
    codeError: '',
    passwordError: ''
  };

  onCodeChange(code) {
    this.props.updateCode(code);
    const codeMessage = code === '' ? 'Code is required' : '';
    this.setState({ codeError: codeMessage });
  }

  onPasswordChange(password) {
    this.props.updatePassword(password);
    const newErrorMessage = password === '' ? 'Password is required' : '';
    this.setState({ passwordError: newErrorMessage });
  }

  onResetPasswordButtonPress() {
    const { codeError, passwordError } = this.state;
    if (this.props.code !== '' &&
        this.props.email !== '' &&
        passwordError === '' &&
        codeError === '') {
      this.props.resetPasswordThroughSocket(
        this.props.email,
        this.props.code,
        this.props.password
      );
    }
    return;
  }

  renderLoginButton() {
    return this.renderButton('Go to Login', () => Actions.login());
  }

  renderResetPasswordButton() {
    if (!this.props.isConnected) {
      return <Spinner size="large" />;
    }

    return this.renderButton(
      'Reset password',
      this.onResetPasswordButtonPress.bind(this));
  }

  renderButton(text, onPress) {
    return (
      <Button onPress={onPress}>
        {text}
      </Button>
    );
  }

  render() {
    return (
      <Card>

        <CardSection>
          <Input
            label="Reset code"
            placeholder="123-abc-de4 or 123abcde4"
            onChangeText={this.onCodeChange.bind(this)}
            value={this.props.code}
          />
        </CardSection>
        <View>
          <Text style={styles.errorTextStyle} >
            { this.state.codeError }
          </Text>
        </View>

        <CardSection>
          <Input
            secureTextEntry
            label="New password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>
        <View>
          <Text style={styles.errorTextStyle} >
            { this.state.passwordError }
          </Text>
        </View>

        <CardSection>
          {this.renderResetPasswordButton()}
        </CardSection>

        <Text style={styles.errorTextStyle} >
          { this.props.resetCodeError }
        </Text>

        <CardSection>
          {this.renderLoginButton()}
        </CardSection>

      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ authentication, socket }) => {
  const { isConnected } = socket;
  const { email, code, password, resetCodeError } = authentication;
  return { email, code, password, resetCodeError, isConnected };
};

export default connect(mapStateToProps, {
  updatePassword,
  updateCode,
  resetPasswordThroughSocket,
  updateResetCodeError })(ResetPasswordForm);

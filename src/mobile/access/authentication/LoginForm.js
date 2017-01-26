import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import validator from 'validator';

import { updatePassword, startLoading } from '../../../web-mobile-common/access/actionGenerators';
import {
  startLoggingInUser,
  updateUsernameOrEmail,
  updateLoginError,
  requestPasswordResetCodeThroughSocket,
  authenticateToSocket,
  logUserInThroughSocket } from
    '../../../web-mobile-common/access/authentication/actionGenerators';
import {
  Card,
  CardSection,
  Input,
  Button,
  Spinner } from '../../common/Components';

class LoginForm extends Component {

  state = {
    usernameOrEmailError: '',
    passwordError: '',
    resetPasswordError: ''
  }

  onUsernameOrEmailChange(text) {
    this.props.updateUsernameOrEmail(text.trim());
    const newErrorMessage = text.trim() === '' ? 'Username is required' : '';
    this.setState({ usernameOrEmailError: newErrorMessage });
  }

  onPasswordChange(text) {
    this.props.updatePassword(text);
    const newErrorMessage = text === '' ? 'Password is required' : '';
    this.setState({ passwordError: newErrorMessage });
  }

  onLoginButtonPress() {
    const { usernameOrEmail, password } = this.props;
    if (this.props.usernameOrEmail !== '' && this.props.password !== '') {
      this.props.logUserInThroughSocket(usernameOrEmail, password);
    } else {
      this.onUsernameOrEmailChange(this.props.usernameOrEmail);
      this.onPasswordChange(this.props.password);
      this.props.updateLoginError('Incomplete');
    }

    return;
  }

  onRegisterButtonPress() {
    return Actions.registration();
  }

  onForgotPasswordButtonPress() {
    const { usernameOrEmail } = this.props;
    if (validator.isEmail(usernameOrEmail)) {
      this.props.requestPasswordResetCodeThroughSocket(usernameOrEmail);
    } else {
      this.setState({ resetPasswordError: 'Enter a valid email' });
    }
  }

  renderLoginButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return this.renderButton('Login', this.onLoginButtonPress.bind(this));
  }

  renderRegisterButton() {
    return this.renderButton('Register', this.onRegisterButtonPress.bind(this));
  }

  renderForgotPasswordButton() {
    return this.renderButton('Forgot password',
      this.onForgotPasswordButtonPress.bind(this));
  }

  renderButton(text, onPress) {
    return (
      <Button onPress={onPress}>
        {text}
      </Button>
    );
  }

  renderIsConnected() {
    if (this.props.isConnected) {
      return (
        <Text>Connected</Text>
        );
    }

    return (
      <Text>Connecting</Text>
      );
  }

  render() {
    return (
      <View>
       { this.renderIsConnected() }
      <Card>
        <CardSection>
          <Input
            label="Username or Email"
            placeholder="email@gmail.com/alicebob"
            onChangeText={this.onUsernameOrEmailChange.bind(this)}
            value={this.props.usernameOrEmail}
          />
        </CardSection>
        <View>
          <Text style={styles.errorTextStyle} >
            { this.state.usernameOrEmailError }
          </Text>
        </View>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
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

        <Text style={styles.errorTextStyle} >
          { this.props.error }
        </Text>

        <CardSection>
          {this.renderLoginButton()}
        </CardSection>

        <CardSection>
          {this.renderRegisterButton()}
        </CardSection>

        <CardSection>
          {this.renderForgotPasswordButton()}
        </CardSection>

        <Text style={styles.errorTextStyle} >
          { this.state.resetPasswordError }
        </Text>

      </Card>
      </View>
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
  const { usernameOrEmail, password, error, loading } = authentication;
  const { isConnected } = socket;
  return { usernameOrEmail, password, error, loading, isConnected };
};

export default connect(mapStateToProps, {
  updateUsernameOrEmail,
  updatePassword,
  startLoggingInUser,
  startLoading,
  updateLoginError,
  requestPasswordResetCodeThroughSocket,
  authenticateToSocket,
  logUserInThroughSocket })(LoginForm);

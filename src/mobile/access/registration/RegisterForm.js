import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import validator from 'validator';

import {
  registerUserThroughSocket,
  checkEmailAvailableThroughSocket,
  checkUsernameAvailableThroughSocket,
  updateRegistrationError } from '../../../web-mobile-common/access/registration/actionGenerators';
import {
  updateEmail,
  updatePassword,
  updateUsername } from '../../../web-mobile-common/access/actionGenerators';
import { Card, CardSection, Input, Button, Spinner } from '../../common/Components';

class RegisterForm extends Component {

  state = {
    emailError: ''
  };

  componentWillMount() {
    this.props.checkEmailAvailableThroughSocket(this.props.email);
    this.props.checkUsernameAvailableThroughSocket(this.props.username);
  }

  onUsernameChange(text) {
    this.props.updateUsername(text.trim());
    const username = text.trim();
    this.props.checkUsernameAvailableThroughSocket(username);
    return;
  }

  onEmailChange(text) {
    this.props.updateEmail(text.trim());
    const email = text.trim();
    if (email !== '') {
        if (validator.isEmail(email)) {
          this.setState({ emailError: '' });
          this.props.checkEmailAvailableThroughSocket(email);
        } else {
          this.setState({ emailError: 'Must be a valid email address. ' });
        }
      } else {
        this.setState({ emailError: '' });
      }
  }

  onPasswordChange(text) {
    this.props.updatePassword(text);
  }

  onRegisterButtonPress() {
    const { username, email, password } = this.props;
    if (validator.isEmail(username) && username !== email) {
      return this.setState({ emailError: 'If username is an email, it must be same as email' });
    }

    if (this.state.emailError !== '' ||
        this.props.usernameAvailableError !== '' ||
        this.props.emailAvailableError !== '') {
      this.props.updateRegistrationError('Please fix errors');
    } else if (
        this.props.email === '' ||
        this.props.username === '' ||
        this.props.password === '') {
      this.props.updateRegistrationError('Incomplete');
    } else {
      this.props.updateRegistrationError('');
    }

    if (this.props.error === '') {
      this.props.registerUserThroughSocket(username, email, password);
    }

    return;
  }

  renderLoginButton() {
    return this.renderButton('Go to Login', () => Actions.authentication());
  }

  renderRegisterButton() {
    if (!this.props.isConnected) {
      return <Spinner size="large" />;
    }

    return this.renderButton('Register', this.onRegisterButtonPress.bind(this));
  }

  renderActivateButton() {
    return this.renderButton('Go to Activate', () => Actions.activation());
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
            label="Username"
            placeholder="username"
            onChangeText={this.onUsernameChange.bind(this)}
            value={this.props.username}
          />
        </CardSection>
        <View>
          <Text style={styles.errorTextStyle} >
            { this.props.usernameAvailableError }
          </Text>
        </View>

        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>
        <View>
          <Text style={styles.errorTextStyle} >
            { this.state.emailError }
            { this.props.emailAvailableError }
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

        <Text style={styles.errorTextStyle} >
          { this.props.error }
        </Text>

        <CardSection>
          {this.renderRegisterButton()}
        </CardSection>

        <CardSection>
          {this.renderLoginButton()}
        </CardSection>

        <CardSection>
          {this.renderActivateButton()}
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

const mapStateToProps = ({ authentication, registration, socket }) => {
  const { isConnected } = socket;
  const { username, email, password } = authentication;
  const { error, emailAvailableError, usernameAvailableError } = registration;
  return { username, email, password, error, emailAvailableError, usernameAvailableError };
};

export default connect(mapStateToProps, {
  updateEmail,
  updatePassword,
  updateUsername,
  registerUserThroughSocket,
  checkEmailAvailableThroughSocket,
  checkUsernameAvailableThroughSocket,
  updateRegistrationError })(RegisterForm);

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import validator from 'validator';

import {
  Card,
  CardSection,
  Input,
  Button,
  Spinner } from '../../common/Components';
import { updateEmail } from '../../../web-mobile-common/access/actionGenerators';
import {
  checkEmailAvailableThroughSocket } from
    '../../../web-mobile-common/access/registration/actionGenerators';
import {
  updateCode,
  updateActivationError,
  activateUserThroughSocket,
  resendActivationCodeThroughSocket,
  updateEmailIsAvailableErrorActivation } from
    '../../../web-mobile-common/access/activation/actionGenerators';
import { updateUsernameOrEmail } from
  '../../../web-mobile-common/access/authentication/actionGenerators';

class ActivateForm extends Component {

  state = {
    emailError: '',
    codeError: '',
    resendActivationCodeError: ''
  };

  componentWillMount() {
    this.props.updateActivationError('');
    this.props.updateEmailIsAvailableErrorActivation('');
  }

  onActivationCodeChange(code) {
    this.props.updateCode(code);
    const codeMessage = code === '' ? 'Code is required' : '';
    this.setState({ codeError: codeMessage });
  }

  onActivateButtonPress() {
    this.props.updateActivationError('');
    if (this.state.codeError !== '' || this.state.emailError !== '') {
      return this.props.updateActivationError('Please fix errors');
    } else if (this.props.email === '' || this.props.code === '') {
      return this.props.updateActivationError('Incomplete');
    }

    if (this.props.error === '') {
      this.props.updateUsernameOrEmail(this.props.email);
      this.props.activateUserThroughSocket(this.props.email, this.props.code);
    }

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
          this.props.updateEmailIsAvailableErrorActivation('');
          this.setState({ emailError: 'Must be a valid email address' });
        }
      } else {
        this.props.updateEmailIsAvailableErrorActivation('');
        this.setState({ emailError: 'Email is required' });
    }
  }

  onLoginButtonPress() {
    return Actions.authentication();
  }

  onResendActivationCodeButtonPress() {
    if (this.state.emailError === '' && this.props.emailAvailableError === '') {
      this.props.resendActivationCodeThroughSocket(this.props.email);
    } else {
      this.setState({ resendActivationCodeError: this.state.emailError });
    }
  }

  renderLoginButton() {
    return this.renderButton('Login', this.onLoginButtonPress.bind(this));
  }

  renderActivateButton() {
    if (!this.props.isConnected) {
      return <Spinner size="large" />;
    }

    return this.renderButton('Activate', this.onActivateButtonPress.bind(this));
  }


  renderResendActivationCodeButton() {
    if (!this.props.isConnected) {
      return <Spinner size="large" />;
    }

    return this.renderButton(
      'Resend activation code',
      this.onResendActivationCodeButtonPress.bind(this));
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
            label="Activation code"
            placeholder="123-abc-de4 or 123abcde4"
            onChangeText={this.onActivationCodeChange.bind(this)}
            value={this.props.code}
          />
        </CardSection>
        <View>
          <Text style={styles.errorTextStyle} >
            { this.state.codeError }
          </Text>
        </View>

        <CardSection>
          {this.renderActivateButton()}
        </CardSection>

        <Text style={styles.errorTextStyle} >
          { this.props.error }
        </Text>

        <CardSection>
          {this.renderLoginButton()}
        </CardSection>

        <CardSection>
          {this.renderResendActivationCodeButton()}
        </CardSection>

        <Text style={styles.errorTextStyle} >
          { this.state.resendActivationCodeError }
        </Text>

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

const mapStateToProps = ({ authentication, activation, socket }) => {
  const { isConnected } = socket;
  const { email } = authentication;
  const { code, error, emailAvailableError } = activation;
  return { email, code, isConnected, error, emailAvailableError };
};

export default connect(mapStateToProps, {
  updateEmail,
  updateCode,
  checkEmailAvailableThroughSocket,
  updateActivationError,
  activateUserThroughSocket,
  updateUsernameOrEmail,
  resendActivationCodeThroughSocket,
  updateEmailIsAvailableErrorActivation
})(ActivateForm);

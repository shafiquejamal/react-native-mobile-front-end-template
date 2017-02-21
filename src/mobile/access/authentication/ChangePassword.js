import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import {
  Card,
  CardSection,
  Input,
  Button,
  Spinner } from '../../common/Components';
import {
  logoutUser,
  changePassword,
  changePasswordThroughSocket,
  logoutFromSocket } from
    '../../../web-mobile-common/access/authentication/actionGenerators';
import { updatePassword } from '../../../web-mobile-common/access/actionGenerators';

class ChangePassword extends Component {

  state = {
    changePasswordError: '',
    currentPasswordError: '',
    passwordError: '',
    currentPassword: ''
  }

  onCurrentPasswordChange(password) {
    this.setState({ currentPassword: password });
    const newErrorMessage = password === '' ? 'Current Password is Required' : '';
    this.setState({ currentPasswordError: newErrorMessage });
  }

  onPasswordChange(password) {
    this.props.updatePassword(password);
    const newErrorMessage = password === '' ? 'New Password is Required' : '';
    this.setState({ passwordError: newErrorMessage });
  }

  onPressChangePasswordButton() {
    this.onPasswordChange(this.props.password);
    this.onCurrentPasswordChange(this.state.currentPassword);
    if (this.state.passwordError === '' && this.state.currentPasswordError === '') {
        this.setState({ changePasswordError: '' });
        this.props.changePasswordThroughSocket(
          this.state.currentPassword, this.props.password);
    } else {
      this.setState({ changePasswordError: 'Please fix errors' });
    }
  }

  renderChangePasswordButton() {
    if (!this.props.isConnected) {
      return <Spinner size="large" />;
    }

    return this.renderButton(
      'Change Password',
      this.onPressChangePasswordButton.bind(this));
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
            secureTextEntry
            label="Current password"
            placeholder="current password"
            onChangeText={this.onCurrentPasswordChange.bind(this)}
            value={this.state.currentPassword}
          />
        </CardSection>
        <View>
          <Text style={styles.errorTextStyle} >
            { this.state.currentPasswordError }
          </Text>
        </View>

        <CardSection>
          <Input
            secureTextEntry
            label="New password"
            placeholder="new password"
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
          {this.renderChangePasswordButton()}
        </CardSection>

        <Text style={styles.errorTextStyle} >
          { this.state.changePasswordError }
          { this.props.passwordChangeError }
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

const mapStateToProps = ({ authentication, socket }) => {
  const { isConnected } = socket;
  const { password, user, passwordChangeError } = authentication;
  return { password, user, passwordChangeError, isConnected };
};

export default connect(mapStateToProps, {
  logoutUser,
  logoutFromSocket,
  updatePassword,
  changePassword,
  changePasswordThroughSocket })(ChangePassword);

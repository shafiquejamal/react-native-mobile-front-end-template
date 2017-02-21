import React, { Component } from 'react';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {
  Card,
  CardSection,
  Button,
  Spinner } from '../../common/Components';
import {
  logoutAllDevicesThroughSocket,
  logoutUser,
  logoutFromSocket } from '../../../web-mobile-common/access/authentication/actionGenerators';

class Settings extends Component {

  state = {
    logoutAllDevicesError: ''
  }

  onLogoutAllDevicesButtonPress() {
    this.setState({ logoutAllDevicesError: '' });
    this.props.logoutAllDevicesThroughSocket();
    this.props.logoutFromSocket();
  }

  renderChangePasswordButton() {
    return this.renderButton('Change Password', () => Actions.changePassword());
  }

  renderLogoutButton() {
    return this.renderButton('Logout', () => {
      this.props.logoutUser();
      this.props.logoutFromSocket();
      Actions.authentication();
    });
  }

  renderLogoutAllDevicesButton() {
    if (!this.props.isConnected) {
      return <Spinner size="large" />;
    }

    return this.renderButton(
      'Logout All Devices',
      this.onLogoutAllDevicesButtonPress.bind(this));
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
        {this.renderChangePasswordButton()}
      </CardSection>

      <CardSection>
        {this.renderLogoutButton()}
      </CardSection>

      <CardSection>
        {this.renderLogoutAllDevicesButton()}
      </CardSection>

      <Text style={styles.errorTextStyle} >
        { this.state.logoutAllDevicesError }
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
  const { user } = authentication;
  return { user };
};

export default connect(mapStateToProps, {
  logoutAllDevicesThroughSocket,
  logoutUser,
  logoutFromSocket
 })(Settings);

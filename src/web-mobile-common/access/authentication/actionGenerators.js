import validator from 'validator';

import { updateField } from '../../common/actionGenerators.js';
import {
  UPDATE_USERNAME_OR_EMAIL,
  LOGIN_USER,
  UPDATE_LOGIN_ERROR,
  START_LOADING_RESET,
  STOP_LOADING_RESET,
  LOGOUT_USER,
  START_LOADING_CHANGE_PASSWORD,
  STOP_LOADING_CHANGE_PASSWORD,
  PASSWORD_RESET_FAILED_UPDATE } from './types';
import { postObject } from '../../socket/actionGenerators';

export const updateUsernameOrEmail =
  (usernameOrEmail) => updateField(UPDATE_USERNAME_OR_EMAIL, usernameOrEmail);

export const requestPasswordResetCodeThroughSocket = (email) => {
  return postObject({
    messageType: 'toServerPasswordResetRequest',
    email
  });
};

export const changePasswordThroughSocket = (currentPassword, newPassword) => {
  console.log('currentPassword', currentPassword);
  console.log('newPassword', newPassword);
  return postObject({
    messageType: 'toServerChangePassword',
    currentPassword,
    newPassword
  });
};

export const startLoadingChangePassword = () => {
  return {
    type: START_LOADING_CHANGE_PASSWORD
  };
};

export const stopLoadingChangePassword = () => {
  return {
    type: STOP_LOADING_CHANGE_PASSWORD
  };
};

export const logoutAllDevicesThroughSocket = () => {
  return postObject({
    messageType: 'toServerLogoutAll'
  });
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  };
};

export const updateResetCodeError = (msg) => {
  return {
    type: PASSWORD_RESET_FAILED_UPDATE,
    payload: msg
  };
};

export const resetPasswordThroughSocket = (email, code, newPassword) => {
  return postObject({
    messageType: 'toServerResetPassword',
    email,
    code,
    newPassword
  });
};

export const logUserInThroughSocket = (usernameOrEmail, password) => {
  const loginCredentials = (validator.isEmail(usernameOrEmail)) ?
    {
      username: '',
      email: usernameOrEmail,
      password
    } :
    {
      email: '',
      username: usernameOrEmail,
      password
    };

  return postObject({
    messageType: 'toServerLogin',
    ...loginCredentials
  });
};

export const loginUser = ({ username, email, token }) => {
  return {
    type: LOGIN_USER,
    payload: {
      username,
      email,
      token
    }
  };
};

export const updateLoginError = (value) => {
  return {
    type: UPDATE_LOGIN_ERROR,
    payload: value
  };
};

export const startLoadingReset = () => {
  return {
    type: START_LOADING_RESET
  };
};

export const stopLoadingReset = () => {
  return {
    type: STOP_LOADING_RESET
  };
};

export const authenticateToSocket = (token) => {
  return postObject({
    messageType: 'toServerAuthenticate',
    jwt: token });
};

export const logoutFromSocket = () => {
  return postObject({
      messageType: 'toServerLogout'
  });
};

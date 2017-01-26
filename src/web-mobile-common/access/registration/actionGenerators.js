import {
  UPDATE_REGISTRATION_ERROR,
  UPDATE_EMAIL_AVAILABLE_ERROR,
  UPDATE_USERNAME_AVAILABLE_ERROR } from './types';
import { postObject } from '../../socket/actionGenerators';
import { updateField } from '../../common/actionGenerators.js';

export const registerUserThroughSocket = (username, email, password) => {
  return postObject({
    messageType: 'toServerRegistration',
    username,
    email,
    password
  });
};

export const checkEmailAvailableThroughSocket = (email) => {
  return postObject({
    messageType: 'toServerIsEmailAvailable',
    email
  });
};

export const updateEmailIsAvailableErrorRegistration =
  (msg) => updateField(UPDATE_EMAIL_AVAILABLE_ERROR, msg);

export const updateUsernameIsAvailableError = (msg) => {
  return {
    type: UPDATE_USERNAME_AVAILABLE_ERROR,
    payload: msg
  };
};

export const checkUsernameAvailableThroughSocket = (username) => {
  return postObject({
    messageType: 'toServerIsUsernameAvailable',
    username
  });
};

export const updateRegistrationError = (value) => {
  return {
    type: UPDATE_REGISTRATION_ERROR,
    payload: value
  };
};

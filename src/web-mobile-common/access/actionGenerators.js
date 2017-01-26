import {
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_USERNAME,
  START_LOADING,
  UPDATE_CODE,
  STOP_LOADING_PASSWORD_RESET,
  START_LOADING_PASSWORD_RESET } from './types';
import { updateField } from '../common/actionGenerators.js';

export const updateEmail =
  (email) => updateField(UPDATE_EMAIL, email);

export const updatePassword =
  (password) => updateField(UPDATE_PASSWORD, password);

export const updateCode =
  (code) => updateField(UPDATE_CODE, code);

export const updateUsername =
  (username) => updateField(UPDATE_USERNAME, username);

export const startLoading = () => {
  return {
    type: START_LOADING
  };
};

export const startLoadingPasswordReset = () => {
  return {
    type: START_LOADING_PASSWORD_RESET
  };
};

export const stopLoadingPasswordReset = () => {
  return {
    type: STOP_LOADING_PASSWORD_RESET
  };
};

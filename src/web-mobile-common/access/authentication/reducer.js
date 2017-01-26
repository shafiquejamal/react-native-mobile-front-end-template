import validator from 'validator';

import {
  UPDATE_USERNAME_OR_EMAIL,
  LOGIN_USER,
  INVALID_CREDENTIALS,
  LOGIN_ERROR,
  UPDATE_LOGIN_ERROR,
  START_LOADING_RESET,
  STOP_LOADING_RESET,
  LOGOUT_USER,
  SOCKET_LOGGING_OUT,
  START_LOADING_CHANGE_PASSWORD,
  STOP_LOADING_CHANGE_PASSWORD,
  PASSWORD_RESET_FAILED_UPDATE,
  PASSWORD_CHANGE_FAILED } from './types';
import {
  UPDATE_USERNAME,
  UPDATE_PASSWORD,
  UPDATE_EMAIL,
  START_LOADING,
  UPDATE_CODE,
  START_LOADING_PASSWORD_RESET,
  STOP_LOADING_PASSWORD_RESET,
  PASSWORD_RESET_SUCCESSFUL } from '../types';

const INITIAL_STATE = {
  error: '',
  email: '',
  username: '',
  usernameOrEmail: '',
  password: '',
  user: null,
  loading: false,
  loadingResetPassword: false,
  loadingReset: false,
  loadingAllLogout: false,
  code: '',
  loadingChangePassword: false,
  resetCodeError: '',
  passwordChangeError: ''
};

export default (state = INITIAL_STATE, action) => {
  const email =
    (typeof (action.payload) === 'string' &&
     validator.isEmail(action.payload)) ? action.payload : '';
  const username =
    (typeof (action.payload) === 'string' &&
     validator.isEmail(action.payload)) ? '' : action.payload;
  switch (action.type) {
    case START_LOADING_CHANGE_PASSWORD:
      return {
        ...state,
        loadingChangePassword: true
      };
    case STOP_LOADING_CHANGE_PASSWORD:
      return {
        ...state,
        loadingChangePassword: false
      };
    case LOGOUT_USER:
      return INITIAL_STATE;
    case SOCKET_LOGGING_OUT:
      return INITIAL_STATE;
    case STOP_LOADING_PASSWORD_RESET:
      return {
        ...state,
        loadingResetPassword: false
      };
    case START_LOADING_RESET:
      return {
        ...state,
        loadingReset: true
      };
    case STOP_LOADING_RESET:
      return {
        ...state,
        loadingReset: false
      };
    case START_LOADING_PASSWORD_RESET:
      return {
        ...state,
        loadingResetPassword: true
      };
    case UPDATE_CODE:
      return {
        ...state,
        code: action.payload
      };
    case UPDATE_LOGIN_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case START_LOADING:
      return {
        ...state,
        loading: true
      };
    case LOGIN_USER:
      return {
        ...INITIAL_STATE,
        user: action.payload
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case INVALID_CREDENTIALS:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_USERNAME_OR_EMAIL:
      return {
        ...state,
        email,
        username,
        usernameOrEmail: action.payload
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.payload
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload
      };
    case PASSWORD_RESET_FAILED_UPDATE: {
      return {
        ...state,
        resetCodeError: action.payload
      };
    }
    case PASSWORD_RESET_SUCCESSFUL:
      return {
        ...state,
        resetCodeError: ''
      };
    case PASSWORD_CHANGE_FAILED: {
      return {
        ...state,
        passwordChangeError: 'Incorrect password'
      };
    }
    default:
      return state;
  }
};

import {
  UPDATE_CODE,
  UPDATE_ACTIVATION_ERROR,
  ACCOUNT_ACTIVATION_SUCCESSFUL,
  START_LOADING_ACTIVATION,
  FINISH_LOADING_RESEND_ACTIVATION,
  START_LOADING_RESEND_ACTIVATION,
  UPDATE_EMAIL_AVAILABLE_ERROR_FOR_ACTIVATION } from './types';
import {
  LOGOUT_USER } from '../authentication/types';

const INITIAL_STATE = {
  loading: false,
  loadingResendActivationCode: false,
  code: '',
  error: '',
  emailAvailableError: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGOUT_USER:
      return INITIAL_STATE;
    case ACCOUNT_ACTIVATION_SUCCESSFUL:
      return INITIAL_STATE;
    case START_LOADING_ACTIVATION:
      return {
        ...state,
        loading: true
      };
    case UPDATE_ACTIVATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_CODE:
      return {
        ...state,
        loading: false,
        code: action.payload
      };
    case START_LOADING_RESEND_ACTIVATION:
      return {
        ...state,
        loadingResendActivationCode: true,
      };
    case FINISH_LOADING_RESEND_ACTIVATION:
      return {
        ...state,
        loadingResendActivationCode: false,
      };
    case UPDATE_EMAIL_AVAILABLE_ERROR_FOR_ACTIVATION:
      return {
        ...state,
        emailAvailableError: action.payload
      };
    default:
      return state;
  }
};

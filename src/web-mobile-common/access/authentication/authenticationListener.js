import { Actions } from 'react-native-router-flux';

import {
  loginUser,
  updateLoginError,
  updateResetCodeError,
  logoutUser,
  logoutFromSocket } from './actionGenerators';


import {
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  LOGOUT_USER,
  SOCKET_LOGGING_OUT,
  PASSWORD_RESET_CODE_SENT,
  PASSWORD_RESET_SUCCESSFUL,
  PASSWORD_RESET_FAILED,
  PASSWORD_CHANGE_SUCCESSFUL } from './types';

export const authenticationListener = (store) => {
    const lastAction = store.getState().lastAction;
    switch (lastAction.type) {
      case LOGIN_SUCCESSFUL: {
        store.dispatch(loginUser(lastAction.payload));
        Actions.domain();
        break;
      }
      case LOGIN_FAILED: {
        store.dispatch(updateLoginError('Invalid login'));
        break;
      }
      case PASSWORD_RESET_CODE_SENT: {
        Actions.resetPassword();
        break;
      }
      case PASSWORD_RESET_SUCCESSFUL: {
        store.dispatch(updateResetCodeError(''));
        Actions.login();
        break;
      }
      case PASSWORD_RESET_FAILED: {
        store.dispatch(updateResetCodeError('Incorrect code'));
        break;
      }
      case PASSWORD_CHANGE_SUCCESSFUL: {
        store.dispatch(logoutUser());
        store.dispatch(logoutFromSocket());
        Actions.authentication();
        break;
      }
      case LOGOUT_USER: {
        store.dispatch(logoutFromSocket());
        Actions.authentication();
        break;
      }
      case SOCKET_LOGGING_OUT: {
        Actions.authentication();
        break;
      }
      default:
        return;
    }
};

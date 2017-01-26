import ReconnectingWebSocket from 'reconnecting-websocket';
import { Actions } from 'react-native-router-flux';

import { WS_ROOT_URL } from '../../web-mobile-common/config/api';
import * as ActionTypes from './types';
import {
  startUpActions,
  setIsConnected,
  setIsDisconnected,
  authenticateToSocket } from './actionGenerators';
import { logoutUser } from '../access/authentication/actionGenerators';

export const webSocketWrapper = (store) => {
  const wrapper = {
    webSocket: null,
    postObject(obj) {
      console.log('--> posting:', obj);
      wrapper.webSocket.send(JSON.stringify(obj));
      console.log('------------ posted ---------------');
    },
    stopWS: () => {
      if (wrapper.webSocket) {
        wrapper.webSocket.close();
      }
    },
    startWS: () => {
      console.log('-----> starting webSocket');
      if (wrapper.webSocket) wrapper.webSocket.close();
      wrapper.webSocket = new ReconnectingWebSocket(WS_ROOT_URL);
      wrapper.webSocket.onopen = () => {
        store.dispatch(setIsConnected());
        const user = store.getState().authentication.user;
        if (user) {
          store.dispatch(authenticateToSocket(user.token));
          startUpActions.forEach(action => store.dispatch(action()));
        } else {
          store.dispatch(logoutUser());
          Actions.authentication();
        }
      };

      wrapper.webSocket.onmessage = (msg) => {
        const message = JSON.parse(msg.data);
        console.log('socket received message', message);
        const type = message.socketMessageType;
        const { payload } = message;
        store.dispatch({ type, payload });
      };

      wrapper.webSocket.onerror = (e) => {
        // an error occurred
        console.log('on error', e.message);
        store.dispatch(setIsDisconnected());
      };

      wrapper.webSocket.onclose = (e) => {
        // connection closed
        console.log('on close:', e.code, e.reason);
      };
    },
    wSListener: () => {
      const lastAction = store.getState().lastAction;

        switch (lastAction.type) {
          case ActionTypes.POST_OBJECT:
            return wrapper.postObject(lastAction.obj);

          case ActionTypes.CONNECT:
            return wrapper.startWS();

          default:
            return;
      }
    },
  };

  return wrapper;
};

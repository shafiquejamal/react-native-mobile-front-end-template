import { CONNECT, POST_OBJECT, IS_CONNECTED, IS_DISCONNECTED } from './types';

export const connectToSocket = () => {
  return {
    type: CONNECT
  };
};

// const fetchContacts = () => {
//   return postObject({
//     messageType: 'toServerRequestContacts',
//     md5ofContacts: '' });
// };

export const postObject = (obj) => {
  return {
      type: POST_OBJECT,
      obj
  };
};

export const startUpActions = [
  // () => fetchContacts(),
  // () => updateMessages()
];

export const setIsConnected = () => {
  return {
    type: IS_CONNECTED
  };
};

export const setIsDisconnected = () => {
  return {
    type: IS_DISCONNECTED
  };
};

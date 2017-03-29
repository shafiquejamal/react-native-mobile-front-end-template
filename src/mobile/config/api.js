import Config from 'react-native-config';

const { PROTOCOL, API_SERVER, WS_PROTOCOL } = Config;

export const ROOT_URL = `${PROTOCOL}://${API_SERVER}`;
export const WS_ROOT_URL = `${WS_PROTOCOL}://${API_SERVER}/messaging`;

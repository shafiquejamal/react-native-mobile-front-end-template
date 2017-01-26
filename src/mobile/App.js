import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Router from './Router';
import { webSocketWrapper } from '../web-mobile-common/socket/webSocketWrapper';

import reducers from '../web-mobile-common/reducers';
import { connectToSocket } from '../web-mobile-common/socket/actionGenerators';
import {
  authenticationListener } from '../web-mobile-common/access/authentication/authenticationListener';
import {
  registrationListener } from '../web-mobile-common/access/registration/registrationListener';

class App extends Component {

  createStoreAndConfigureSocket() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    const wSWrapper = webSocketWrapper(store);
    store.subscribe(() => wSWrapper.wSListener());
    store.subscribe(() => authenticationListener(store));
    store.subscribe(() => registrationListener(store));
    store.dispatch(connectToSocket());
    return store;
  }

  render() {
    return (
      <Provider store={this.createStoreAndConfigureSocket()} >
        <Router />
      </Provider>
    );
  }
}

export default App;

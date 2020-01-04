/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {Root} from 'native-base';
import store from './src/utils/store';
import {StoreProvider, useStoreActions, useStoreState} from 'easy-peasy';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import App from './src/Router';

const persistor = persistStore(store);

const Initializer = props => {
  const initialize = useStoreActions(actions => actions.initialise);
  const isLoggedIn = useStoreState(state => state.auth.loggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      initialize();
    }
  }, [initialize, isLoggedIn]);
  return props.children;
};

export default props => {
  return (
    <PersistGate persistor={persistor}>
      <StoreProvider store={store}>
        <Initializer>
          <Root>
            <App />
          </Root>
        </Initializer>
      </StoreProvider>
    </PersistGate>
  );
};

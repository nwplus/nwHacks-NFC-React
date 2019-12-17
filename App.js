/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import store from './src/utils/store';
import {StoreProvider} from 'easy-peasy';
import Main from './src/views/main';
export default props => {
  return (
    <StoreProvider store={store}>
      <Main />
    </StoreProvider>
  );
};

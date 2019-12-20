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
import Main from './src/views/Main';
import Login from './src/views/Login';
import Scan from './src/views/Scan';
import Test from './src/views/Test';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//Router for the app
const MainApp = createStackNavigator(
  {
    Home: Main,
    Scan,
    Test
  },
  {
    initialRouteName: 'Home',
  },
);

const Auth = createStackNavigator(
  {
    Login,
  },
  {
    initialRouteName: 'Login',
  },
);

const AppNavigator = createSwitchNavigator(
  {
    Auth,
    Main: MainApp,
  },
  {
    initialRouteName: 'Auth',
  },
);

const App = createAppContainer(AppNavigator);

export default props => {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
};

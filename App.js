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
import Test from './src/views/Test';
import Login from './src/views/Login';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import DrawerNavigator from './src/navigation/DrawerNavigator';

//Router for the app
// const MainApp = createStackNavigator(
//   {
//     Home: Main,
//     Test,
//   },
//   {
//     initialRouteName: 'Home',
//   },
// );

// const Auth = createStackNavigator(
//   {
//     Login,
//   },
//   {
//     initialRouteName: 'Login',
//   },
// );

// const AppNavigator = createSwitchNavigator(
//   {
//     Auth,
//     Main: MainApp,
//   },
//   {
//     initialRouteName: 'Auth',
//   },
// );

// const App = createAppContainer(AppNavigator);

export default props => {
  return (
    <StoreProvider store={store}>
      <DrawerNavigator />
      {/* <App /> */}
    </StoreProvider>
  );
};

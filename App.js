/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import store from './src/utils/store';
import { StoreProvider } from 'easy-peasy';
import Main from './src/views/Main';
import Login from './src/views/Login';
import Scan from './src/views/Scan';
import Test from './src/views/Test';
import Login from './src/views/Login';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform, Dimensions } from 'react-native';

// Screen imports
import EventsScreen from './src/views/Events';
import WorkshopsScreen from './src/views/Workshops';
import ApplicantsScreen from './src/views/Applicants';
import CoatCheckScreen from './src/views/CoatCheck';
import ScanScreen from './src/views/Scan';
import MenuDrawer from './src/components/MenuDrawer';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.83,
  contentComponent: ({ navigation }) => {
    return (<MenuDrawer navigation={navigation}/>)
  }

}

//Router for the app
const DrawerNavigator = createDrawerNavigator(
  {
    Home: Main,
    Events: EventsScreen,
    Workshops: WorkshopsScreen,
    Applicants: ApplicantsScreen,
    "Coat Check": CoatCheckScreen,
    Scan: ScanScreen,
    Test,
  },
  DrawerConfig,
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
    Main: DrawerNavigator,
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

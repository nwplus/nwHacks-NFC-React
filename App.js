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
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Dimensions} from 'react-native';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

// Screen imports
import EventsScreen from './src/views/Events';
import WorkshopsScreen from './src/views/Workshops';
import ApplicantsScreen from './src/views/Applicants';
import CoatCheckScreen from './src/views/CoatCheck';
import ScanScreen from './src/views/Scan';
import MenuDrawer from './src/components/MenuDrawer';
import AttendeeScreen from './src/views/Attendee';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.83,
  contentComponent: ({navigation}) => {
    return <MenuDrawer navigation={navigation} />;
  },
};

//Router for the app
const DrawerNavigator = createDrawerNavigator(
  {
    // Home: Main,
    Attendee: AttendeeScreen,
    Events: EventsScreen,
    Workshops: WorkshopsScreen,
    Applicants: ApplicantsScreen,
    'Coat Check': CoatCheckScreen,
    Scan: ScanScreen,
    // put attendee back
  },
  DrawerConfig,
  {
    initialRouteName: 'Attendee',
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
    initialRouteName: 'Main',
  },
);

const App = createAppContainer(AppNavigator);

const persistor = persistStore(store);

export default props => {
  return (
    <PersistGate persistor={persistor}>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </PersistGate>
  );
};

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Dimensions} from 'react-native';
import React from 'react';
// Screen imports
import ScanScreen from './views/Scan';
import MealsScreen from './views/Meals';
import WorkshopsScreen from './views/Workshops';
import ApplicantsScreen from './views/Applicants';
import CoatCheckScreen from './views/CoatCheck';
import MenuDrawer from './components/MenuDrawer';
import AttendeeScreen from './views/Attendee';
import Main from './views/Main';
import Login from './views/Login';

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
    Home: Main,
    Attendee: AttendeeScreen,
    Meals: MealsScreen,
    Workshops: WorkshopsScreen,
    Applicants: ApplicantsScreen,
    'Coat Check': CoatCheckScreen,
    Scan: ScanScreen,
    // put attendee back
  },
  DrawerConfig,
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

export default App;

import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from '../views/Home';
import EventsScreen from '../views/Events';
import WorkshopsScreen from '../views/Workshops';
import CoatCheckScreen from '../views/CoatCheck';
import ScanScreen from '../views/Scan';

import MenuDrawer from '../components/MenuDrawer';
const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: WIDTH * 0.83,

    contentComponent: ({ navigation }) => {
        return (<MenuDrawer navigation={navigation}/>)
    }

}

const DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Events: {
            screen: EventsScreen
        },
        Workshops: {
            screen: WorkshopsScreen
        },
        "Coat Check": {
            screen: CoatCheckScreen
        },
        Scan: {
            screen: ScanScreen
        }
    },
    DrawerConfig)

export default createAppContainer(DrawerNavigator);
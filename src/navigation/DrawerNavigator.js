import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from '../views/Home';
import EventsScreen from '../views/Events';
import WorkshopsScreen from '../views/Workshops';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: WIDTH * 0.83,
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
        }
    },
    DrawerConfig)

export default createAppContainer(DrawerNavigator);
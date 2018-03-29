/**
 * @flow
 */

import React from 'react';
import { ScrollView, StatusBar,Text } from 'react-native';
import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation';

import Home from './src/containers/Home'
import Page1 from './src/containers/Page1'
import Welcome from './src/containers/Welcome'


const TabNav = TabNavigator(
  {
    Home: {
      screen: Home,
      path: '/',
      navigationOptions: {
        header: null
      },
    },
    SettingsTab: {
      screen: Page1,
      path: '/settings',
      navigationOptions: {
        header: null
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
  }
);

const StacksOverTabs = StackNavigator({
  Root: {
    screen: TabNav,
  },
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      header: null,
    },
  },
  Profile: {
    screen: Page1,
    path: '/people/:name',
    navigationOptions: ({ navigation }) => {
      title: `${navigation.state.params.name}'s Profile!`;
    },
  },
},{
  initialRouteName: 'Welcome'
});

export default StacksOverTabs;
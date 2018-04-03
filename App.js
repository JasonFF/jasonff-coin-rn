/**
 * @flow
 */

import React from 'react';
import { ScrollView, StatusBar,Text } from 'react-native';
import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation';

import Usdt from './src/containers/Usdt'
import Btc from './src/containers/Btc'
import Welcome from './src/containers/Welcome'


const StacksOverTabs = StackNavigator({
  Usdt: {
    screen: Usdt,
    path: '/',
    navigationOptions: {
      header: null
    },
  },
  Btc: {
    screen: Btc,
    path: '/btc',
    navigationOptions: {
      header: null
    },
  },
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      header: null,
    },
  },
},{
  initialRouteName: 'Usdt'
});

export default StacksOverTabs;
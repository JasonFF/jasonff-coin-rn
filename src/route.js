import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './containers/Home/Home'

export default StackNavigator({
  Home: {
    screen: Home,
  },
},
{
  initialRouteName: 'Home',
}
);
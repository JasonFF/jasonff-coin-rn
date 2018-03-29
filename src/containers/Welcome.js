import React from 'react'
import {Flex, WhiteSpace, Button} from 'antd-mobile';
import {View, Text, ImageBackground, Dimensions} from 'react-native'
import {getWindowSize} from '../utils'

export default class Welcome extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.replace('Root')
    }, 2000)
    
  }
  render() {
    return (
      <View>
        <ImageBackground resizeMode="cover" style={{
          width: getWindowSize().width,
          height: getWindowSize().height
        }} source={require('../assets/bg.jpg')}>
          <Flex style={{marginTop: 100}}>
            <Flex.Item><Text style={{fontSize: 25, textAlign: 'center', color: 'white'}}>Welcome to JasonFF's App</Text></Flex.Item>
          </Flex>
        </ImageBackground>
        
      </View>
    )
  }
}

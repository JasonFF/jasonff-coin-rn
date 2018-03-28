import React from 'react'
import {Flex, WhiteSpace} from 'antd-mobile';
import {View, Text} from 'react-native'

export default class Page1 extends React.Component {
  render() {
    return (
      <View>
        <Flex>
          <Flex.Item><Text>page1</Text></Flex.Item>
          <Flex.Item><Text>page1</Text></Flex.Item>
        </Flex>
      </View>
    )
  }
}

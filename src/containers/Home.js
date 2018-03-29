import React from 'react'
import {Flex, WhiteSpace, WingBlank} from 'antd-mobile';
import {View, Text} from 'react-native'
// import fetch from 'fetch'

export default class Home extends React.Component {
  componentWillMount() {
    this.setState({
      data: '1'
    })
    fetch("https://otc-api.huobipro.com/v1/otc/trade/list/public?coinId=2&tradeType=0&currentPage=1&payWay=&country=&merchant=1&online=1&range=0").then((res)=>{
      this.setState({
        data: res
      })
      console.log(res.json())
    })
  }
  render() {
    return (
      <View>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <Flex>
          <Flex.Item><WingBlank><Text>{JSON.stringify(this.state.data)}</Text></WingBlank></Flex.Item>
        </Flex>
      </View>
    )
  }
}

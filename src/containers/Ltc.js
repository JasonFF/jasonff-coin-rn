import React from 'react'
import {
  Container,
  Text,
  List,
  ListItem,
  Button,
  Title,
  Header,
  Body,
  Left,
  Right,
  Footer,
  FooterTab,
  Content
} from 'native-base'
import {View} from 'react-native'
import action from '../utils/fetch'
import {Grid, Col, Row} from 'react-native-easy-grid'

function getFixed(val) {
  return val.toFixed(3)
}

export default class Usdt extends React.Component {
  constructor() {
    super()
    this.state = {
      huoData: [],
      yoData: [],
      fetching1: false,
      fetching2: false,
    }
  }
  componentDidMount() {
    this.updateData()
  }
  updateData() {
    if (this.state.fetch1 || this.state.fetching2) {
      return alert('正在获取中')
    }
    this.setState({
      huoData: [],
      yoData: []
    })
    this.getHuoData()
    this.getYoData()
  }
  getYoData() {
    this.setState({
      fetching1: true
    })
    return action({url: 'https://yobit.net/api/3/depth/ltc_usd'}).then(res => {
      let result = []
      const asks = res.ltc_usd.asks
      const bids = res.ltc_usd.bids
      for (let i = 0; i < 10; i++) {
        result.push({
          ask: asks[i][0],
          askMount: asks[i][1],
          bid: bids[i][0],
          bidMount: bids[i][1]
        })
      }
      console.log(result)
      this.setState({
        fetching1: false,
        yoData: result
      })
    })
  }
  getHuoData() {
    this.setState({
      fetching2: true
    })
    return action({
      url: 'https://api.huobipro.com/market/depth?symbol=ltcusdt&type=step0'
    }).then(res => {
      let result = []
      const asks = res.tick.asks
      const bids = res.tick.bids
      for (let i = 0; i < 10; i++) {
        result.push({
          ask: asks[i][0],
          askMount: asks[i][1],
          bid: bids[i][0],
          bidMount: bids[i][1]
        })
      }
      this.setState({
        fetching2: false,
        huoData: result
      })
      console.log(result)
    })
  }
  render() {
    const {yoData, huoData} = this.state
    let chazhi = 0
    let percent = 0
    try {
      chazhi = yoData[0].bid - huoData[0].ask
      percent = (chazhi/huoData[0].ask)*100
    }catch(e){}
    return (
      <Container>
        <Header>
          <Body>
            <Title>LTC</Title>
          </Body>
        </Header>
        <Content>
        <Grid>
            <Row style={{
              flexDirection:'column',
              justifyContent:'center',
              alignItems:'center',
              paddingTop: 20,
              paddingBottom: 20
            }} size={10}>
              <Text style={{
                fontSize: 20
              }}>火币搬运到yobit </Text>
              <Text>
              {getFixed(chazhi)}
              </Text>
              <Text>
              {getFixed(percent)}%
              </Text>
            </Row>
            <Row size={65}>
              <Col>
              <View style={{
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
              }}>
              <Text style={{fontSize: 18}}>火币购买</Text>
              </View>
              
                {huoData.map((it, index) => {
                  return (
                    <ListItem style={{
                      flexDirection:'column',
                      justifyContent:'center',
                      alignItems:'center'
                    }} key={index}>
                      <Text style={{fontSize: 15}}>{getFixed(it.ask)}</Text>
                      <Text style={{fontSize: 15}}>${getFixed(it.askMount*it.ask)}</Text>
                    </ListItem>
                  )
                })}
              </Col>
              <Col>
              <View style={{
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
              }}>
              <Text style={{fontSize: 18}}>yobit卖出</Text>
              </View>
                {yoData.map((it, index) => {
                  return (
                    <ListItem style={{
                      flexDirection:'column',
                      justifyContent:'center',
                      alignItems:'center',
                    }} key={index}>
                      <Text style={{fontSize: 15}}>{getFixed(it.bid)}</Text>
                      <Text style={{fontSize: 15}}>${getFixed(it.bidMount*it.bid)}</Text>
                    </ListItem>
                  )
                })}
              </Col>
            </Row>
            <Row size={25} style={{paddingTop: 10, paddingBottom:20}}>
              <Col></Col>
              <Col>
                <Button block onPress={() => this.updateData()}>
                  <Text>更新数据</Text>
                </Button>
              </Col>
              <Col></Col>
            </Row>
          </Grid>
        </Content>
        <Footer>
          <FooterTab>
            <Button  onPress={() => this.props.navigation.replace('Usdt')}>
              <Text>USDT</Text>
            </Button>
            <Button onPress={() => this.props.navigation.replace('Btc')}>
              <Text>BTC</Text>
            </Button>
            <Button onPress={() => this.props.navigation.replace('Eth')} >
              <Text>ETH</Text>
            </Button>
            <Button active >
              <Text>LTC</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

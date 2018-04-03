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
import {ScrollView, StyleSheet} from 'react-native'
import action from '../utils/fetch'
import {Grid, Col, Row} from 'react-native-easy-grid'
const PAGE = 6
const LEVEL = 0.03

const styles = StyleSheet.create({
  textCenter: {
    textAlign: 'center'
  }
})
export default class Usdt extends React.Component {
  constructor() {
    super()
    this.fetchData = this
      .fetchData
      .bind(this)
    this.fetchHuobiDataBuy = this
      .fetchHuobiDataBuy
      .bind(this)
    this.fetchHuobiDataSell = this
      .fetchHuobiDataSell
      .bind(this)
    this.state = {
      buyData: [],
      sellData: [],
      fetching1: false,
      fetching2: false,
      hbhl: ''
    }
  }

  getHuobiHuilv() {
    return action({
      url: 'https://otc-api.huobipro.com/v1/otc/base/market/price'
    }).then(res => {
      try {
        res
          .data
          .forEach(it => {
            if (it.coinId == 2) {
              this.setState({hbhl: it.price})
            }
          })
      } catch (e) {
        console.log(e)
      }
    })
  }
  fetchHuobiDataBuy(page = 1, maxPage) {
    this.setState({fetching1: true})
    return action({
      url: 'https://otc-api.huobipro.com/v1/otc/trade/list/public',
      params: {
        coinId: 2,
        tradeType: 1,
        currentPage: page,
        merchant: 1,
        online: 1,
        range: 0,
        currPage: page
      }
    }).then(res => {
      this.setState({
        buyData: this
          .state
          .buyData
          .concat(res.data)
      })
      if (res.data.length == 10 && res.data[9].fixedPrice < this.state.buyData[0].fixedPrice / 1 + LEVEL) {
        this.fetchHuobiDataBuy(page + 1, maxPage)
      } else {
        this.setState({fetching1: false})
      }
    })
  }
  fetchHuobiDataSell(page = 1, maxPage) {
    this.setState({fetching2: true})
    return action({
      url: 'https://otc-api.huobipro.com/v1/otc/trade/list/public',
      params: {
        coinId: 2,
        tradeType: 0,
        currentPage: page,
        merchant: 1,
        online: 1,
        range: 0,
        currPage: page
      }
    }).then(res => {
      this.setState({
        sellData: this
          .state
          .sellData
          .concat(res.data)
      })
      if (res.data.length == 10 && res.data[9].fixedPrice > this.state.sellData[0].fixedPrice / 1 - LEVEL) {
        this.fetchHuobiDataSell(page + 1, maxPage)
      } else {
        this.setState({fetching2: false})
      }
    })
  }
  fetchData() {
    this.fetchHuobiDataBuy(1, PAGE)
    this.fetchHuobiDataSell(1, PAGE)
  }
  updateData() {
    if (this.state.fetching1 || this.state.fetching2) {
      return alert('正在获取中')
    }
    this.setState({buyData: [], sellData: []})
    this.fetchData()
    this.getHuobiHuilv()
  }
  render() {
    let buyList = []
    let sellList = []
    let buyListData = {}
    let sellListData = {}
    const {
      buyData = [],
      sellData = [],
      hbhl
    } = this.state || {}
    buyData.forEach(it => {
      if (buyListData[it.fixedPrice]) {
        buyListData[it.fixedPrice].push(it)
      } else {
        buyListData[it.fixedPrice] = [it]
      }
    })
    sellData.forEach(it => {
      if (sellListData[it.fixedPrice]) {
        sellListData[it.fixedPrice].push(it)
      } else {
        sellListData[it.fixedPrice] = [it]
      }
    })
    Object
      .keys(buyListData)
      .forEach(it => {
        buyList.push({price: it, data: buyListData[it]})
      })
    Object
      .keys(sellListData)
      .forEach(it => {
        sellList.push({price: it, data: sellListData[it]})
      })
    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title >USDT</Title>
          </Body>
          <Right />
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
              }}>火币汇率：{hbhl}</Text>
            </Row>
            <Row size={65}>
              <Col>
                {buyList.map((it, index) => {
                  return (
                    <ListItem style={{
                      flexDirection:'column',
                      justifyContent:'center',
                      alignItems:'center',
                    }} key={index}>
                      <Text>{it.price}({it.data.length})</Text>
                    </ListItem>
                  )
                })}
              </Col>
              <Col>
                {sellList.map((it, index) => {
                  return (
                    <ListItem style={{
                      flexDirection:'column',
                      justifyContent:'center',
                      alignItems:'center',
                    }} key={index}>
                      <Text>{it.price}({it.data.length})</Text>
                    </ListItem>
                  )
                })}
              </Col>
            </Row>
            <Row size={25} style={{paddingTop: 10}}>
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
            <Button active>
              <Text>USTD</Text>
            </Button>
            <Button onPress={() => this.props.navigation.push('Btc')}>
              <Text>BTC</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

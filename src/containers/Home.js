import React from 'react'
import {
  Container,
  Text,
  List,
  ListItem,
  Button,
  Row,
  Title,
  Header,
  Body
} from 'native-base'
import {ScrollView} from 'react-native'
import action from '../utils/fetch'
import {Grid, Col} from 'react-native-easy-grid'
const PAGE = 6
const LEVEL = 0.03
export default class Home extends React.Component {
  construtor() {
    this.fetchData = this
      .fetchData
      .bind(this)
    this.fetchHuobiDataBuy = this
      .fetchHuobiDataBuy
      .bind(this)
    this.fetchHuobiDataSell = this
      .fetchHuobiDataSell
      .bind(this)
  }
  componentWillMount() {
    this.setState({buyData: [], sellData: [], fetching1: false, fetching2: false, hbhl: ''})
    // this.fetchData()
  }
  getHuobiHuilv() {
    return axios('https://otc-api.huobipro.com/v1/otc/base/market/price').then(res => {
      try {
        res
          .data
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
  }
  render() {
    let buyList = []
    let sellList = []
    let buyListData = {}
    let sellListData = {}
    const {buyData, sellData} = this.state
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
    console.log(buyList, sellList)
    return (
      <Container>
        <Header>
          <Body>
            <Title>USTD</Title>
          </Body>
        </Header>
        <Grid>
          <Row size={10}><Text>火币汇率：{this.state.hbhl}</Text></Row>
          <Row size={65}>
            <ScrollView>
              <Col>
                {buyList.map((it, index) => {
                  return (
                    <ListItem key={index}>
                      <Text>{it.price}({it.data.length})</Text>
                    </ListItem>
                  )
                })}
              </Col>
              <Col>
                {sellList.map((it, index) => {
                  return (
                    <ListItem key={index}>
                      <Text>{it.price}({it.data.length})</Text>
                    </ListItem>
                  )
                })}
              </Col>
            </ScrollView>

          </Row>
          <Row size={25}>
            <Col></Col>
            <Col>
              <Button block onPress={() => this.updateData()}>
                <Text>更新数据</Text>
              </Button>
            </Col>
            <Col></Col>

          </Row>
        </Grid>

      </Container>
    )
  }
}

import React, { Component } from 'react';
import { Container, Header, Content, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {getWindowSize} from '../utils/utils'
export default class Welcome extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.replace('Root')
    }, 2500)
    
  }
  render() {
    return (
      <Container style={{height: getWindowSize().height }}>
          <Grid>
            <Row style={{ backgroundColor: '#333'}}>
              <Text style={{color: '#eee'}}>welcome to JasonFF's app</Text>
            </Row>
          </Grid>
      </Container>
    );
  }
}
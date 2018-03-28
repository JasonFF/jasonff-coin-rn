import React from 'react'
import {View, Text, ImageBackground} from 'react-native'
import {Button} from 'antd-mobile'

export default class Home extends React.Component {
  render() {
    const {navigation} = this.props
    return (
      <ScrollView>
        <SafeAreaView forceInset={{
          horizontal: 'always'
        }}>
          <Text>{banner}</Text>
          <Button
            onPress={() => navigation.navigate('Profile', {name: 'Jordan'})}
            title="Open profile screen"/>
          <Button
            onPress={() => navigation.navigate('NotifSettings')}
            title="Open notifications screen"/>
          <Button
            onPress={() => navigation.navigate('SettingsTab')}
            title="Go to settings tab"/>
          <Button onPress={() => navigation.goBack(null)} title="Go back"/>
        </SafeAreaView>
        <StatusBar barStyle="default"/>
      </ScrollView>
    )
  }
}
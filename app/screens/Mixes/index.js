import React, { Component } from 'react'
import Home from './Home'
import Charge from './Charge'
import User from './User'
import Setting from './Setting'
import More from './More'

import { TabNavigator } from 'react-navigation'
import { Button, Icon, Footer, FooterTab } from 'native-base'


import { StackNavigator } from 'react-navigation'

const HomeNav = StackNavigator({
  Home: { screen: Home },
  Charge: { screen: Charge },
})

export default ( MainScreenNavigator = TabNavigator(
  {
    HomeNav: { screen: HomeNav },
    User: { screen: User },
    Setting: { screen: Setting },
    More: { screen: More }
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate('HomeNav')}>
              <Icon name='bowtie' />
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate('User')}>
              <Icon name='briefcase' />
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate('Setting')}>
              <Icon name='bowtie' />
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 3}
              onPress={() => props.navigation.navigate('More')}>
              <Icon name='briefcase' />
            </Button>
          </FooterTab>
        </Footer>
      )
    }
  }
))

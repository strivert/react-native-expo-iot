import React, { Component } from 'react'
import { Animated, Easing } from 'react-native'
import Home from './Home'
import Charge from './Charge'
import User from './User'
import Setting from './Setting'
import More from './More'

import ChargePoint from './ChargePoint'
import ChargeSetting from './ChargeSetting'
import AddCharge from './AddCharge'

import { TabNavigator, StackNavigator } from 'react-navigation'
import Footer from '../../components/common/Footer'

const HomeNav = StackNavigator(
  {
    Home: { screen: Home },
    Charge: { screen: Charge },
  }, {
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),
  }
)
const SettingNav = StackNavigator(
  {
    ChargePoint: { screen: ChargePoint },
    ChargeSetting: { screen: ChargeSetting },
    AddCharge: { screen: AddCharge },
  }, {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),
    headerMode: 'none',
  }
)

export default ( MainScreenNavigator = TabNavigator(
  {
    HomeNav: { screen: HomeNav },
    User: { screen: User },
    SettingNav: { screen: SettingNav },
    More: { screen: More },
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: props=> (<Footer {...props} />),
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
  }
))

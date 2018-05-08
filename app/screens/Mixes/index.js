import React, { Component } from 'react'
import Home from './Home'
import Charge from './Charge'
import User from './User'
import Setting from './Setting'
import More from './More'



import { TabNavigator, StackNavigator } from 'react-navigation'
import Footer from '../../components/common/Footer'

const HomeNav = StackNavigator(
  {
    Home: { screen: Home },
    Charge: { screen: Charge },
  }, { headerMode: 'none' }
)
const SettingNav = StackNavigator(
  {
    ChargePoint: { screen: ChargePoint },
    ChargeSetting: { screen: ChargeSetting },
    AddCharge: { screen: AddCharge },
  }, { headerMode: 'none' }
)

export default ( MainScreenNavigator = TabNavigator(
  {
    HomeNav: { screen: HomeNav },
    User: { screen: User },
    Setting: { screen: Setting },
    More: { screen: More },
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: props=> (<Footer {...props} />),
    swipeEnabled: false,
  }
))

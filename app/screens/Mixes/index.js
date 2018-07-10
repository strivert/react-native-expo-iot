import React, { Component } from 'react'
import { Animated, Easing } from 'react-native'
import Home from './Home'
import User from './User'
import Setting from './Setting'
import More from './More'
import TermsWeb from './TermsWeb'

import ChargeSchedule from './ChargeSchedule'
import ChargePoint from './ChargePoint'
import ChargeSetting from './ChargeSetting'
import AddCharge from './AddCharge'
import UnitCost from './UnitCost'

import { TabNavigator, StackNavigator } from 'react-navigation'
import Footer from '../../components/common/Footer'

/*
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
*/
const SettingNav = StackNavigator(
  {
    ChargePoint: { screen: ChargePoint },
    ChargeSetting: { screen: ChargeSetting },
    AddCharge: { screen: AddCharge },
    ChargeSchedule: { screen: ChargeSchedule },
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

const UserNav = StackNavigator(
  {
    User: { screen: User },
    TermsWeb: { screen: TermsWeb },
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

const MoreNav = StackNavigator(
  {
    More: { screen: More },
    UnitCost: { screen: UnitCost },
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
    HomeNav: { screen: Home },
    UserNav: { screen: UserNav },
    SettingNav: { screen: SettingNav },
    MoreNav: { screen: MoreNav },
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: props=> (<Footer {...props} />),
    swipeEnabled: false,
    animationEnabled: false,
    backBehavior: 'none',
    lazy: true,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
  }
))

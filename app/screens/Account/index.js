import Details from './Details'
import AdView from './AdView'
import { Animated, Easing } from 'react-native'

import { StackNavigator } from 'react-navigation'

const Account = StackNavigator({
  AdView: { screen: AdView },
  Details: { screen: Details },
}, {
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
      timing: Animated.timing,
      easing: Easing.step0,
    },
  }),
})

export default Account

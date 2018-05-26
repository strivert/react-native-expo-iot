import Mixes from '../Mixes/'
import Account from '../Account/AdView'
import { StackNavigator } from 'react-navigation'
import { Animated, Easing } from 'react-native'

const BootstrapRouter = StackNavigator(
  {
    Account: { screen: Account },
    Mixes: { screen: Mixes },
  }, {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),
    navigationOptions: () => ({
      gesturesEnabled: false,
    }),
    headerMode: 'none',
  }
)

export default BootstrapRouter

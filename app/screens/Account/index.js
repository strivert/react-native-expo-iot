import Details from './Details'
import AdView from './AdView'

import { StackNavigator } from 'react-navigation'

const Account = StackNavigator({
  AdView: { screen: AdView },
  Details: { screen: Details },
})

export default Account

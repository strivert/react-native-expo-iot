import Mixes from '../Mixes/'
import Account from '../Account/'
import { DrawerNavigator } from 'react-navigation'

const BootstrapRouter = DrawerNavigator(
  {
    Account: { screen: Account },
    Mixes: { screen: Mixes },
  }
)

export default BootstrapRouter

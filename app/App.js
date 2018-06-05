import React, {Component} from 'react'
import {StyleProvider} from 'native-base'
import {Provider} from 'react-redux'
import {NativeRouter} from 'react-router-native'
import {AsyncStorage, View, Image} from 'react-native'
import {Font, Asset} from 'expo'
import getTheme from '../native-base-theme/components'
import material from '../native-base-theme/variables/material'
import {setDefaults} from './actions/storeActions'
import AppContainer from './containers/App'
import store from './store'
import Spinner from './components/common/Spinner'

console.disableYellowBox = true

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fontLoaded: false,
    }
  }

  componentDidMount () {
    // AsyncStorage.clear()
    Promise.all([
      AsyncStorage.multiGet(['email', 'token', 'refreshToken']),
      Font.loadAsync({
        Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        Proxima_nova_altblack: require('./assets/fonts/Proxima-Nova-Alt-Black-webfont.ttf'),
        Proxima_nova_altbold: require('./assets/fonts/Proxima-Nova-Alt-Bold-webfont.ttf'),
        Proxima_nova: require('./assets/fonts/Proxima-Nova-Alt-Regular-webfont.ttf'),
        Proxima_nova_scosfthin: require('./assets/fonts/Proxima-Nova-ScOsf-Thin-webfont.ttf'),
        Proxima_nova_ltsemibold: require('./assets/fonts/Proxima-Nova-Semibold-webfont.ttf'),
        Proxima_nova_ltthin: require('./assets/fonts/Proxima-Nova-Thin-webfont.ttf'),
        Proxima_nova_light: require('./assets/fonts/Proxima-nova-light-webfont.ttf'),
        Arial: require('./assets/fonts/arial.ttf'),
      }),
      [
        require('./assets/images/splash.png'),
        require('./assets/images/bottom_icons/account1.png'),
        require('./assets/images/bottom_icons/account2.png'),
        require('./assets/images/bottom_icons/home1.png'),
        require('./assets/images/bottom_icons/home2.png'),
        require('./assets/images/bottom_icons/more1.png'),
        require('./assets/images/bottom_icons/more2.png'),
        require('./assets/images/bottom_icons/setting1.png'),
        require('./assets/images/bottom_icons/setting2.png'),

        require('./assets/images/page_icons/account3.png'),
        require('./assets/images/page_icons/setting3.png'),
        require('./assets/images/page_icons/lock.png'),
        require('./assets/images/page_icons/spinner.gif'),
        require('./assets/images/gradient.png'),
        require('./assets/images/logo.png'),
        require('./assets/images/logo1.png'),
        require('./assets/images/page_icons/back.png'),
        require('./assets/images/page_icons/next.png'),

        require('./assets/images/status_icons/charge1.png'),
        require('./assets/images/status_icons/charge-disable.png'),
        require('./assets/images/status_icons/maintenance1.png'),
        require('./assets/images/status_icons/maintenance2.png'),
        require('./assets/images/status_icons/maintenance1-disable.png'),
        require('./assets/images/status_icons/security1.png'),
        require('./assets/images/status_icons/security1-disable.png'),
        require('./assets/images/status_icons/security2.png'),
        require('./assets/images/status_icons/security3.png'),
        require('./assets/images/status_icons/security4.png'),
        require('./assets/images/status_icons/security5.png'),
        require('./assets/images/status_icons/security6.png'),
        require('./assets/images/status_icons/status1.png'),
        require('./assets/images/status_icons/status2.png'),
        require('./assets/images/status_icons/status3.png'),
        require('./assets/images/status_icons/status4.png'),
        require('./assets/images/status_icons/status5.png'),
        require('./assets/images/status_icons/status5-disable.png'),
        require('./assets/images/status_icons/status6.png'),
        require('./assets/images/status_icons/status7.png'),
        require('./assets/images/status_icons/status7-disable.png'),
        require('./assets/images/status_icons/status8.png'),
        require('./assets/images/status_icons/cost1.png'),
        require('./assets/images/status_icons/power1.png'),
        require('./assets/images/status_icons/cost2.png'),
        require('./assets/images/status_icons/power2.png'),
      ].map((image) => {
        return Asset.fromModule(image).downloadAsync()
      }),
    ])
      .then(data => {
        const storage = data[0].reduce((obj, [key, value]) => {
          obj[key] = value
          return obj
        }, {})

        const defaultState = {
          user: {
            email: storage.email,
          },
          auth: {
            token: storage.token,
            refreshToken: storage.refreshToken,
          },
        }

        store.dispatch(setDefaults(defaultState))
        this.setState({fontLoaded: true})
      })
  }

  render () {
    const {fontLoaded} = this.state

    return !fontLoaded || !store ? (
      <View style={{flex: 1}}>
        <Image
          source={require('./assets/images/splash.png')}
          style={{flex: 1, width: undefined, height: undefined}}
        >
        </Image>
        <Spinner style={{position: 'absolute', left: '50%', top: '50%', marginLeft: -25, marginTop: -25}} />
      </View>
    ) : (
      <StyleProvider style={getTheme(material)}>
        <Provider store={store}>
          <NativeRouter>
            <AppContainer />
          </NativeRouter>
        </Provider>
      </StyleProvider>
    )
  }
}

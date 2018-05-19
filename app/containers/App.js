import React, { Component } from 'react'
import {Container, StyleProvider} from 'native-base'
import PropTypes from 'prop-types'
import {NetInfo, View, Image, AppState} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import io from 'socket.io-client'
import {withRouter} from 'react-router-native'
import {ANDERSEN_IOT_DOMAIN} from 'react-native-dotenv'
import getTheme from '../../native-base-theme/components'
import platform from '../../native-base-theme/variables/platform'
import {receivedDeviceStatus, socketConnected, socketDisconnected, receivedDeviceCount} from '../actions/particleActions'
import {setConnectionStatus, setConnectionInter} from '../actions/storeActions'
import {fetchUser} from '../actions/andersenActions'
import {logout} from '../actions/azureActions'

import BootStrap from '../screens/Bootstrap'

import {Notifications} from 'expo'

const notification1 = {
  "title": "No Server Connection!",
  "body": "Check your network",
  "data": {
    "iWantData": "yesPlease"
  },
  "ios": {
    "sound": true
  },
  "android": {
    "sound": true
  },
}

const notification2 = {
  "title": "Network Connected!",
  "body": "Network connected",
  "data": {
    "iWantData": "yesPlease"
  },
  "ios": {
    "sound": true
  },
  "android": {
    "sound": true
  },
}

class AppContainer extends Component {
  constructor (props) {
    // console.log('constructor');
    super(props)

    this.socket = null
    this.socketAuthenticated = false
    this.state = {
      appState: AppState.currentState,
    }
  }

  componentDidMount () {
    // this.props.logout()
    NetInfo.getConnectionInfo().then(connectionInfo => this.props.setConnectionStatus(connectionInfo))
    NetInfo.addEventListener('connectionChange', connectionInfo => this.props.setConnectionStatus(connectionInfo))

    AppState.addEventListener('change', this.handleAppStateChange)

    this.setupSocket()
    this.connectSocket()

    this.statusIcons = {
      'account1': require('../assets/images/bottom_icons/account1.png'),
      'account2': require('../assets/images/bottom_icons/account2.png'),
      'home1': require('../assets/images/bottom_icons/home1.png'),
      'home2': require('../assets/images/bottom_icons/home2.png'),
      'more1': require('../assets/images/bottom_icons/more1.png'),
      'more2': require('../assets/images/bottom_icons/more2.png'),
      'setting1': require('../assets/images/bottom_icons/setting1.png'),
      'setting2': require('../assets/images/bottom_icons/setting2.png'),

      'account3': require('../assets/images/page_icons/account3.png'),
      'setting3': require('../assets/images/page_icons/setting3.png'),
      'lock': require('../assets/images/page_icons/lock.png'),
      'spinner': require('../assets/images/page_icons/spinner.gif'),
      'gradient': require('../assets/images/gradient.png'),
      'logo': require('../assets/images/logo.png'),
      'back': require('../assets/images/page_icons/back.png'),
      'next': require('../assets/images/page_icons/next.png'),

      'charge1': require('../assets/images/status_icons/charge1.png'),
      'charge-disable': require('../assets/images/status_icons/charge-disable.png'),
      'maintenance1': require('../assets/images/status_icons/maintenance1.png'),
      'maintenance1-disable': require('../assets/images/status_icons/maintenance1-disable.png'),
      'security1': require('../assets/images/status_icons/security1.png'),
      'security1-disable': require('../assets/images/status_icons/security1-disable.png'),
      'security2': require('../assets/images/status_icons/security2.png'),
      'security3': require('../assets/images/status_icons/security3.png'),
      'security4': require('../assets/images/status_icons/security4.png'),
      'status1': require('../assets/images/status_icons/status1.png'),
      'status2': require('../assets/images/status_icons/status2.png'),
      'status3': require('../assets/images/status_icons/status3.png'),
      'status4': require('../assets/images/status_icons/status4.png'),
      'status5': require('../assets/images/status_icons/status5.png'),
      'status5-disable': require('../assets/images/status_icons/status5-disable.png'),
    }
  }

  componentWillUnmount () {
    // console.log('unmount');
    this.socket.disconnect()
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  componentWillReceiveProps (nextProps) {
    const scheduleOptions = {
      "time": Date.now() + 1000
    }
    if (this.props.internetConnection === true && nextProps.internetConnection === false) {
      Notifications.scheduleLocalNotificationAsync(notification1, scheduleOptions)
    }
    if (this.props.token && this.props.internetConnection === false && nextProps.internetConnection === true) {
      // Notifications.scheduleLocalNotificationAsync(notification2, scheduleOptions)
    }
    if (this.props.internetConnection === false && nextProps.internetConnection === true) {
      this.reconnectSocket()
    }
    if (this.props.token !== nextProps.token && nextProps.token !== null) {
      this.reconnectSocket()
    }

    if (this.props.token !== null && nextProps.token === null) {
      this.socket.disconnect()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.token !== this.props.token) {
      this.reconnectSocket()
    }
    if (!this.props.token && this.socket) {
      this.socket.disconnect()
      this.socketAuthenticated = false
    }
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.reconnectSocket()
    }
    this.setState({appState: nextAppState});
  }

  setupSocket () {
    this.socket = io(`${ANDERSEN_IOT_DOMAIN}/iot`)
    this.socket.on('connect', () => {
      this.props.socketConnected()
      this.socket.emit('authorize', {id_token: this.props.token})
    })
    this.socket.on('chargerstatus', data => {
      // console.log('chargerstatus', data)
      this.props.receivedDeviceStatus(data)
    })
    this.socket.on('devicecount', data => {
      this.props.receivedDeviceCount(data)
    })
    this.socket.on('authenticated', () => {
      this.socketAuthenticated = true
    })
    this.socket.on('invalidToken', () => {
      this.socketAuthenticated = false
    })
    this.socket.on('disconnect', () => {
      this.props.socketDisconnected()
    })
  }

  connectSocket () {
    if (!this.props.token || (this.socket && this.socket.connected)) {
      return
    }
    this.socket.connect()
  }

  reconnectSocket () {
    if (this.socket && !this.socket.socketAuthenticated) {
      // console.log('RRReconnect')      
      this.setupSocket()
      this.connectSocket()
      this.props.setConnectionInter(true)
    }
  }

  render () {
    let viewArr = []
    for (var key in this.statusIcons) {
      viewArr.push(
        <Image key={`startImg-${key}`} source={this.statusIcons[key]} />
      )
    }

    return <StyleProvider style={getTheme(platform)}>
      <Container style={{marginTop: 24}}>
        <BootStrap />
        <View style={{height: 0, opacity: 0, position: 'absolute', right: -9999}}>
          {viewArr}
        </View>
      </Container>
    </StyleProvider>
  }
}

AppContainer.propTypes = {
  receivedDeviceStatus: PropTypes.func.isRequired,
  token: PropTypes.string,
  socketConnected: PropTypes.func.isRequired,
  socketDisconnected: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  setConnectionStatus: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  internetConnection: PropTypes.bool,
  setConnectionInter: PropTypes.func,
  receivedDeviceCount: PropTypes.func,
}

export default withRouter(connect(
  state => ({
    token: state.auth.token,
    internetConnection: state.misc.internetConnection,
  }),
  dispatch => bindActionCreators({receivedDeviceStatus, socketConnected, socketDisconnected, fetchUser, setConnectionStatus, logout, setConnectionInter, receivedDeviceCount}, dispatch)
)(AppContainer))

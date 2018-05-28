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
import store from '../store'
import {useRefreshToken} from '../actions/azureActions'

const notification1 = {
  "title": "Network Offline!",
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
  }

  componentWillUnmount () {
    // this.socket.disconnect()
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  componentWillReceiveProps (nextProps) {
    const scheduleOptions = {
      "time": Date.now() + 1000
    }
    if (this.props.internetConnection === true && nextProps.internetConnection === false) {
      // Notifications.scheduleLocalNotificationAsync(notification1, scheduleOptions)
    }
    if (this.props.token && this.props.internetConnection === false && nextProps.internetConnection === true) {
      //  Notifications.scheduleLocalNotificationAsync(notification2, scheduleOptions)
    }
    if (this.props.internetConnection === false && nextProps.internetConnection === true) {
      // this.reconnectSocket()
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
      // console.log('devicecount', data)
      this.props.receivedDeviceCount(data)
    })
    this.socket.on('authenticated', () => {
      // console.log('authenticated')
      this.socketAuthenticated = true
    })
    this.socket.on('invalidToken', () => {
      this.socketAuthenticated = false

      store.dispatch(useRefreshToken(this.props.refreshToken))
      .then(() => {
      })
      .catch(err => {
        // console.warn('refreshtoken failed', err)
      })
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
    if (!this.props.internetConnection) {
      return false
    }
    if (this.socket && !this.socket.socketAuthenticated) {
      // if (this.props.socketConnectedVariable) {
        this.socket.disconnect()
      // }
      this.socket.connect()
    } else {
      this.freshConnectSocket();
    }
  }

  freshConnectSocket() {
    this.socket = null
    this.socketAuthenticated = false
    setTimeout( ()=> {
      this.setupSocket()
      this.connectSocket()
    }, 100);
  }
  
  render () {
    return <StyleProvider style={getTheme(platform)}>
      <Container style={{marginTop: 24}}>
        <BootStrap />
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
    socketConnectedVariable: state.particle.socketConnected,
    refreshToken: state.auth.refreshToken,
  }),
  dispatch => bindActionCreators({receivedDeviceStatus, socketConnected, socketDisconnected, fetchUser, setConnectionStatus, logout, setConnectionInter, receivedDeviceCount, useRefreshToken}, dispatch)
)(AppContainer))

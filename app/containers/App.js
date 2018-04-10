import React, { Component } from 'react'
import {Container, StyleProvider} from 'native-base'
import PropTypes from 'prop-types'
import {NetInfo} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import io from 'socket.io-client'
import {withRouter} from 'react-router-native'
import {ANDERSEN_IOT_DOMAIN} from 'react-native-dotenv'
import getTheme from '../../native-base-theme/components'
import platform from '../../native-base-theme/variables/platform'
import {receivedDeviceStatus, socketConnected, socketDisconnected} from '../actions/particleActions'
import {setConnectionStatus} from '../actions/storeActions'
import {fetchUser} from '../actions/andersenActions'
import {logout} from '../actions/azureActions'

import BootStrap from '../screens/Bootstrap'

class AppContainer extends Component {
  constructor (props) {
    super(props)

    this.socket = null
    this.socketAuthenticated = false
  }

  componentDidMount () {    
    // this.props.logout()
    NetInfo.getConnectionInfo().then(connectionInfo => this.props.setConnectionStatus(connectionInfo))
    NetInfo.addEventListener('connectionChange', connectionInfo => this.props.setConnectionStatus(connectionInfo))

    this.setupSocket()
    this.connectSocket()
  }

  componentWillUnmount () {
    this.socket.disconnect()
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

  setupSocket () {
    this.socket = io(`${ANDERSEN_IOT_DOMAIN}/iot`)
    this.socket.on('connect', () => {
      this.props.socketConnected()
      this.socket.emit('authorize', {id_token: this.props.token})
    })
    this.socket.on('chargerstatus', data => {
      console.log('chargerstatus', data);
      this.props.receivedDeviceStatus(data)
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
      this.socket.disconnect()
      this.socket.connect()
    }
  }

  render () {
    return <StyleProvider style={getTheme(platform)}>
      <Container>
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
}

export default withRouter(connect(
  state => ({
    token: state.auth.token,
  }),
  dispatch => bindActionCreators({receivedDeviceStatus, socketConnected, socketDisconnected, fetchUser, setConnectionStatus, logout}, dispatch)
)(AppContainer))

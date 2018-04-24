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
import {setConnectionStatus, setConnectionInter} from '../actions/storeActions'
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

  componentWillReceiveProps (nextProps) {
    // console.log('this.props.internetConnection', this.props.internetConnection)
    // console.log('nextProps.internetConnection', nextProps.internetConnection)
    // if ((this.props.internetConnection !== nextProps.internetConnection) && nextProps.internetConnection === false) {
    if (this.props.internetConnection === false && nextProps.internetConnection === true) {
      this.reconnectSocket()
    }
    if (this.props.token !== nextProps.token) {
      this.reconnectSocket()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // console.log('componentDidUpdate')
    if (prevProps.token !== this.props.token) {
      // console.log('componentDidUpdated')
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
      console.log('chargerstatus', data)
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
    // console.log('this.socket', this.socket)
    // console.log('this.socket.socketAuthenticated', this.socket.socketAuthenticated)
    if (this.socket && !this.socket.socketAuthenticated) {
      // console.log('RRReconnect')
      /*
      this.socket.disconnect()
      this.setupSocket()
      this.socket.connect()
      */
      this.setupSocket()
      this.connectSocket()
      this.props.setConnectionInter(true)
    }
  }

  render () {
    // console.log('this.props.misc', this.props.internetConnection)
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
}

export default withRouter(connect(
  state => ({
    token: state.auth.token,
    internetConnection: state.misc.internetConnection,
  }),
  dispatch => bindActionCreators({receivedDeviceStatus, socketConnected, socketDisconnected, fetchUser, setConnectionStatus, logout, setConnectionInter}, dispatch)
)(AppContainer))

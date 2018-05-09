import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  Button,
  Text,
  Spinner,
  View,
  Content,
  Footer,
  FooterTab,
  Container,
  H1,
} from 'native-base'

import styles from '../../styles'

import ViewForAdd1 from '../../components/adding_device/ViewForAdd1'
import ViewForAdd2 from '../../components/adding_device/ViewForAdd2'
import ViewForAdd3 from '../../components/adding_device/ViewForAdd3'
import ViewForAdd4 from '../../components/adding_device/ViewForAdd4'
import ViewForAdd5 from '../../components/adding_device/ViewForAdd5'
import ViewForAdd6 from '../../components/adding_device/ViewForAdd6'
import ViewForAdd7 from '../../components/adding_device/ViewForAdd7'
import ViewForAdd8 from '../../components/adding_device/ViewForAdd8'
import ViewForAdd9 from '../../components/adding_device/ViewForAdd9'
import ViewForAdd10 from '../../components/adding_device/ViewForAdd10'
import ViewForAdd11 from '../../components/adding_device/ViewForAdd11'

import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'
import {fetchId, fetchHotspots, configureAndConnectAp} from '../../actions/chipActions'
import {setConnectionInter} from '../../actions/storeActions'

import {createClaimCode} from '../../actions/particleActions'
import {deleteDevice, postDevice} from '../../services/particleService'

class AddingDeviceContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      viewState: 0,

      selectedHotspot: null,
      hotspots: null,
      connected: false,
      deviceId: null,
      addedDevice: false,
      exceedWaiting: false,
      password: '',
    }

    this.fetchIdInterval = null
    this.verifyingConnectionInterval = null
  }

  componentDidMount () {
    this.props.fetchId()
      .then(response => this.setState({connected: true, deviceId: response.action.payload.data.id}))
      .catch(() => this.setState({connected: false}))

    this.fetchIdInterval = this.setInterval(() => {
      this.props.fetchId()
        .then(response => this.setState({connected: true, deviceId: response.action.payload.data.id}))
        .catch(() => this.setState({connected: false}))
    }, 2000)
  }

  increaseViewState () {
    this.setState({
      viewState: (this.state.viewState + 1),
    })
  }

  onCancel () {
    this.props.navigation.goBack()
  }

  onContinue () {
    this.setState({
      viewState: (this.state.viewState + 1),
    })
  }

  getHotspots () {
    this.props.fetchHotspots()
      .then(() => this.setState({hotspots: this.props.hotspots}))
      .catch(() => this.setState({hotspots: null}))
  }

  handleSelectHotspot (hotspot) {
    this.setState({
      selectedHotspot: hotspot,
      showPassword: false,
      password: '',
    })
  }

  setPassword (passwordText) {
    this.setState({
      password: passwordText,
    })
  }

  addDevice () {
    const _this = this
    const {deviceId} = this.state
    this.verifyingConnectionInterval = this.setInterval(() => {
      deleteDevice(deviceId)
        .then((a) => {
          // alert('a')
          return postDevice(deviceId)
        })
        .then((b) => {
          _this.onContinue()
          _this.setState({
            addedDevice: true,
          })
          // alert('b')
          // console.log(b)
        })
        .catch((err) => {
          console.log(err)
          // alert(err)
        })
    }, 3000)

    setTimeout(() => {
      if (!this.state.addedDevice) {
        this.setState({
          viewState: 10,
        })
      }
    }, 30000)
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.viewState === 5) {
      if (!this.state.hotspots && this.props.connected) {
        this.getHotspots()
      }
    }

    if (this.state.viewState !== 8) {
      this.clearInterval(this.verifyingConnectionInterval)
    }

    if (this.state.viewState > 7) {
      this.clearInterval(this.fetchIdInterval)
    }
  }

  render () {
    let ViewComponent = null
    switch (this.state.viewState) {
      case 0:
        ViewComponent = ViewForAdd1
        break
      case 1:
        ViewComponent = ViewForAdd2
        break
      case 2:
        ViewComponent = ViewForAdd3
        break
      case 3:
        ViewComponent = ViewForAdd4
        break
      case 4:
        ViewComponent = ViewForAdd5
        break
      case 5:
        ViewComponent = ViewForAdd6
        break
      case 6:
        ViewComponent = ViewForAdd7
        break
      case 7:
        ViewComponent = ViewForAdd8
        break
      case 8:
        ViewComponent = ViewForAdd9
        break
      case 9:
        ViewComponent = ViewForAdd10
        break
      case 10:
        ViewComponent = ViewForAdd11
        break
      default:
        ViewComponent = ViewForAdd1
    }

    return (
      <Container style={styles.bgColor}>
        <ViewComponent
          onCancel={() => {
            this.onCancel()
          }}
          onContinue={() => {
            this.onContinue()
          }}

          { ...this.state }

          handleSelectHotspot={(item) => this.handleSelectHotspot(item)}
          setPassword={(passwordText) => this.setPassword(passwordText)}
          configureAndConnectAp={this.props.configureAndConnectAp}
          setConnectionInter={this.props.setConnectionInter}
          addDevice={() => this.addDevice()}
          goFail={() => {
            this.setState({
              viewState: 10,
            })
          }}
        />
      </Container>
    )
  }
}

reactMixin(AddingDeviceContainer.prototype, TimerMixin)

AddingDeviceContainer.propTypes = {
  fetchId: PropTypes.func.isRequired,
  fetchHotspots: PropTypes.func.isRequired,
  configureAndConnectAp: PropTypes.func.isRequired,
  createClaimCode: PropTypes.func.isRequired,
  hotspots: PropTypes.array,
  fetchingHotspots: PropTypes.bool,
  connected: PropTypes.bool,
  attemptingConnection: PropTypes.bool,
  creatingClaimCode: PropTypes.bool,
  claimCode: PropTypes.string,

  navigation: PropTypes.object,
  refresh: PropTypes.number,
  setConnectionInter: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    hotspots: state.chip.hotspots,
    fetchingHotspots: state.chip.fetchingHotspots,
    connected: state.chip.connected,
    attemptingConnection: state.chip.attemptingConnection,
    creatingClaimCode: state.particle.creatingClaimCode,
    claimCode: state.particle.claimCode,
  }),
  dispatch => bindActionCreators({
    fetchId,
    fetchHotspots,
    configureAndConnectAp,
    createClaimCode,
    setConnectionInter,
  }, dispatch)
)(AddingDeviceContainer)

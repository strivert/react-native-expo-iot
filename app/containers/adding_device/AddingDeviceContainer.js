import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Container } from 'native-base'

import styles from '../../styles'

import ViewForAdd0 from '../../components/adding_device/ViewForAdd0'
import ViewForAdd1 from '../../components/adding_device/ViewForAdd1'
import ViewForAdd2 from '../../components/adding_device/ViewForAdd2'
import ViewForAdd3 from '../../components/adding_device/ViewForAdd3'
import ViewForAdd4 from '../../components/adding_device/ViewForAdd4'
import ViewForAdd6 from '../../components/adding_device/ViewForAdd6'
import ViewForAdd7 from '../../components/adding_device/ViewForAdd7'
import ViewForAdd8 from '../../components/adding_device/ViewForAdd8'
import ViewForAdd9 from '../../components/adding_device/ViewForAdd9'
import ViewForAdd10 from '../../components/adding_device/ViewForAdd10'
import ViewForAdd11 from '../../components/adding_device/ViewForAdd11'
import ViewForAdd12 from '../../components/adding_device/ViewForAdd12'
import ViewForAdd13 from '../../components/adding_device/ViewForAdd13'
import ViewForAdd14 from '../../components/adding_device/ViewForAdd14'

import PageHeaderBack from '../../components/common/PageHeaderBack'

import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'
import {fetchId, fetchHotspots, configureAndConnectAp} from '../../actions/chipActions'
import {setConnectionInter} from '../../actions/storeActions'
import {setSerialNumber, setLocation, createClaimCode, renameDevice, setMapUpdated} from '../../actions/particleActions'

import {deleteDevice, postDevice} from '../../services/particleService'
import locationService from '../../services/locationService'
import odiff from 'odiff'

class AddingDeviceContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      viewState: -1,

      selectedHotspot: null,
      hotspots: null,
      connected: false,
      deviceId: null,
      addedDevice: false,
      exceedWaiting: false,
      password: '',
      saving: false,
    }

    this.fetchIdInterval = null
    this.verifyingConnectionInterval = null

    this.handleSaveName = this.handleSaveName.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (odiff.equal(this.props, nextProps) && odiff.equal(this.state, nextState)) {
      return false
    } else {
      return true
    }
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
    // alert('amount')
  }

  componentWillUnmount () {
    this.clearInterval(this.fetchIdInterval)
  }

  clearVerifyingConnectionInterval () {
    this.clearInterval(this.verifyingConnectionInterval)
  }

  increaseViewState () {
    let newState = this.state.viewState + 1
    if (newState === 4) {
      newState += 1
    }
    this.setState({
      viewState: newState,
    })
  }

  onCancel () {
    this.props.navigation.goBack()
  }

  onContinue () {
    // alert('onContinue')
    let newState = this.state.viewState + 1
    if (newState === 4) {
      newState += 1
    }
    if (newState === 7 && this.state.selectedHotspot.sec <= 0) {
      newState += 1
    }
    if (newState === 14) {
      newState = 12
    }
    this.setState({
      viewState: newState,
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
    if (!deviceId) {
      return
    }
    this.verifyingConnectionInterval = this.setInterval(() => {
      deleteDevice(deviceId)
        .then((a) => {
          return postDevice(deviceId)
        })
        .then((b) => {
          _this.setState({
            viewState: 11,
            addedDevice: true,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }, 3000)

    setTimeout(() => {
      if (!this.state.addedDevice) {
        // alert('no added Device no')
        this.clearInterval(this.verifyingConnectionInterval)
        this.setState({
          viewState: 10,
        })
      }
    }, 60000)
  }

  clearHotspots () {
    this.setState({
      viewState: 5,
      selectedHotspot: null,
      hotspots: null,
    })
  }

  addAgain () {
    this.setState({
      viewState: -1,

      selectedHotspot: null,
      hotspots: null,
      connected: false,
      deviceId: null,
      addedDevice: false,
      exceedWaiting: false,
      password: '',
      showPassword: false,
    })

    this.fetchIdInterval = null

    this.props.fetchId()
      .then(response => this.setState({connected: true, deviceId: response.action.payload.data.id}))
      .catch(() => this.setState({connected: false}))

    this.fetchIdInterval = this.setInterval(() => {
      this.props.fetchId()
        .then(response => {
          this.setState({connected: true, deviceId: response.action.payload.data.id})
        })
        .catch(() => {
          this.setState({connected: false})
        })
    }, 2000)
    this.clearInterval(this.verifyingConnectionInterval)
    this.verifyingConnectionInterval = null
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.viewState === 5) {
      if (!this.state.hotspots && this.props.connected) {
        this.getHotspots()
      } else {
        if (!this.state.hotspots && !this.props.connected) {
          setTimeout(() => {
            this.setState({
              viewState: 10,
            })
          }, 2000)
        }
      }
    }

    if (this.state.viewState === 3 && this.props.connected) {
      this.setState({viewState: 5})
    }

    if (this.state.viewState !== 8) {
      this.clearInterval(this.verifyingConnectionInterval)
    }

    if (this.state.viewState > 7) {
      this.clearInterval(this.fetchIdInterval)
    }
  }

  handleSerialRead (data, saveLocation) {
    this.setState({saving: true})

    const promises = [this.props.setSerialNumber(this.state.deviceId, data.data.toString())]

    if (saveLocation) {
      promises.push(
        locationService.getLocation()
          .then(coords => {
            return this.props.setLocation(this.state.deviceId, coords)
          }, err => alert('Error', err))
      )
    }

    Promise.all(promises)
      .then(() => this.setState({
        saving: false,
      }))
      .then(() => this.onContinue())
  }

  handleSaveName (name) {
    this.setState({saving: true})
    this.props.renameDevice(this.state.deviceId, name)
      .then(() => this.setState({saving: false, viewState: 9}))
  }

  render () {
    let ViewComponent = null
    switch (this.state.viewState) {
      case -1:
        ViewComponent = ViewForAdd0
        break
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
      case 11:
        ViewComponent = ViewForAdd12
        break
      case 12:
        ViewComponent = ViewForAdd13
        break
      case 13:
        ViewComponent = ViewForAdd14
        break
      default:
        ViewComponent = ViewForAdd1
    }

    return (
      <Container style={styles.bgColor}>
        <PageHeaderBack pageName='ChargePoint' {...this.props} />
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
          goManualQR={() => {
            this.setState({
              viewState: 13,
            })
          }}
          clearHotspots={() => this.clearHotspots()}
          goDashboard={() => {
            this.props.navigation.navigate('HomeNav')
          }}
          addAgain={() => this.addAgain() }
          clearVerifyingConnectionInterval={() => this.clearVerifyingConnectionInterval() }
          onBarCodeRead={(data, saveLocation) => this.handleSerialRead(data, saveLocation)}
          onSaveName={name => this.handleSaveName(name)}
          setMapUpdated={this.props.setMapUpdated}
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
  setLocation: PropTypes.func,
  setSerialNumber: PropTypes.func,
  renameDevice: PropTypes.func.isRequired,
  setMapUpdated: PropTypes.func,
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
    setSerialNumber,
    setLocation,
    renameDevice,
    setMapUpdated,
  }, dispatch)
)(AddingDeviceContainer)

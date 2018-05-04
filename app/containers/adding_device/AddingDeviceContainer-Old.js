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
import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'
import {fetchId, fetchHotspots, configureAndConnectAp} from '../../actions/chipActions'
import {setConnectionInter} from '../../actions/storeActions'

import {createClaimCode} from '../../actions/particleActions'
import Hotspots from '../../components/adding_device/Hotspots'
import PasswordModal from '../../components/adding_device/PasswordModal'
import {deleteDevice, postDevice} from '../../services/particleService'
import styles from '../../styles'

class AddingDeviceContainer extends Component {
  constructor (props) {
    super(props)

    this.handlePressScan = this.handlePressScan.bind(this)
    this.handleSelectHotspot = this.handleSelectHotspot.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleSubmitConnect = this.handleSubmitConnect.bind(this)
    this.handleClickBeginSetup = this.handleClickBeginSetup.bind(this)

    this.state = {
      selectedHotspot: null,
      stage: 1,
      hotspots: null,
      connected: false,
      deviceId: null,
      addedDevice: false,
      exceedWaiting: false,
    }

    this.fetchIdInterval = null
    this.verifyingConnectionInterval = null
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.refresh !== nextProps.refresh) {
      this.setState({
        selectedHotspot: null,
        stage: 1,
        hotspots: null,
        deviceId: null,
        addedDevice: false,
      })
      this.clearInterval(this.verifyingConnectionInterval)

      this.props.fetchId()
        .then(response => this.setState({connected: true, deviceId: response.action.payload.data.id}))
        .catch(() => this.setState({connected: false}))
    }
  }

  componentDidMount () {
    // console.log('this.props', this.props)
    this.props.fetchId()
      .then(response => this.setState({connected: true, deviceId: response.action.payload.data.id}))
      .catch(() => this.setState({connected: false}))

    this.fetchIdInterval = this.setInterval(() => {
      this.props.fetchId()
        .then(response => this.setState({connected: true, deviceId: response.action.payload.data.id}))
        .catch(() => this.setState({connected: false}))
    }, 2000)
  }

  componentWillUnmount () {
    this.clearInterval(this.fetchIdInterval)
    this.clearInterval(this.verifyingConnectionInterval)
  }

  componentDidUpdate (prevProps, prevState) {
    if (!prevProps.connected && this.props.connected) {
      this.getHotspots()
    }

    if (prevState.stage === 1 && this.state.stage === 2 && !this.props.claimCode) {
      this.props.createClaimCode()
        .catch(() => {
          // alert('Failed to create claim code')
        })
    }

    if (prevState.stage !== 3 && this.state.stage === 3) {
      const _this = this
      const {deviceId} = this.state
      this.verifyingConnectionInterval = this.setInterval(() => {
        deleteDevice(deviceId)
          .then((a) => {
            // alert('a')
            return postDevice(deviceId)
          })
          .then((b) => {
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
        this.setState({
          exceedWaiting: true,
        })
      }, 30000)
    }
  }

  getHotspots () {
    this.props.fetchHotspots()
      .then(() => this.setState({hotspots: this.props.hotspots}))
      .catch(() => this.setState({hotspots: null}))
  }

  handlePressScan () {
    this.getHotspots()
  }

  handleSelectHotspot (hotspot) {
    this.setState({
      selectedHotspot: hotspot,
      showPassword: false,
      password: '',
    })
  }

  handleModalClose () {
    this.setState({selectedHotspot: null})
  }

  handleSubmitConnect (selectedHotspot, password) {
    this.props.configureAndConnectAp(
      selectedHotspot.ssid,
      password,
      selectedHotspot.sec,
      selectedHotspot.ch
    )
      .then(() => {
        // alert('connected')
        this.props.setConnectionInter(false)
        this.setState({stage: 3})
      })
      .catch(() => {
        // alert('Connection failed')
      })
  }

  handleClickBeginSetup () {
    this.setState({
      stage: 2,
      exceedWaiting: false,
    })
  }

  handleClose () {
    // this.props.navigation.navigate('User')
    // console.log('this.props.navigation', this.props)
  }

  render () {
    const {
      fetchingHotspots,
      connected,
      attemptingConnection,
      creatingClaimCode,
      claimCode,
    } = this.props

    const {
      handlePressScan,
      handleSelectHotspot,
      handleModalClose,
      handleSubmitConnect,
      handleClickBeginSetup,
    } = this

    const {selectedHotspot, stage, hotspots} = this.state

    const beforeYouStart = <View style={[styles.flex, styles.bgColor]}>
      <Content padder2>
        <H1 mt style={[styles.txtColor]}>Before you start, please ensure that:</H1>
        <Text mt style={[styles.txtColor]}>{'\u2022'} You are within 5m of your charge point</Text>
        <Text mt style={[styles.txtColor]}>{'\u2022'} You are also within range of your home wifi</Text>
        <Text mt style={[styles.txtColor]}>{'\u2022'} You know your home wifi password</Text>
        <Text mt style={[styles.txtColor]}>{'\u2022'} You have your Andersen setup pack with you</Text>
      </Content>
      <Footer>
        <FooterTab buttons style={{backgroundColor: '#f2f2f2'}}>
          <Button onPress={handleClickBeginSetup}>
            <Text style={[styles.txtColor]}>Begin setup</Text>
          </Button>
        </FooterTab>
      </Footer>
    </View>

    const awaitingWifi = <Content style={[styles.bgColor]}>
      {creatingClaimCode && <Spinner />}
      {!creatingClaimCode && claimCode && <View padder2 style={[styles.bgColor]}>
        <H1 bold style={[styles.txtColor]}>First, connect to the chargepoint with your phone</H1>
        <Text bold mt style={[styles.txtColor]}>Please select the network from your Andersen chargepoint.</Text>
        <Text mt style={[styles.txtColor]}>The network name should appear as Andersen-XXXX</Text>
        <Text mt style={[styles.txtColor]}>Waiting for connection...</Text>
        <Spinner />
      </View>}
    </Content>

    const listHotspots = <View style={[styles.flex, styles.bgColor]}>
      <Content>
        <View padder>
          <Text style={[styles.txtColor]}>Select the wifi hotspot you wish to connect the chargepoint to:</Text>
        </View>
        {fetchingHotspots && <View padder>
          <Text style={[styles.txtColor]}>Searching for wifi hotspots...</Text>
          <Spinner />
        </View>}
        {!fetchingHotspots && hotspots && <Hotspots onSelect={handleSelectHotspot} hotspots={hotspots} />}
        {selectedHotspot && <PasswordModal
          handleModalClose={handleModalClose}
          selectedHotspot={selectedHotspot}
          handleSubmitConnect={handleSubmitConnect}
          attemptingConnection={attemptingConnection}
        />}
      </Content>
      <Footer>
        <FooterTab buttons style={{backgroundColor: '#f2f2f2'}}>
          <Button disabled={fetchingHotspots} onPress={handlePressScan}>
            <Text style={[styles.txtColor]}>Scan for hotspots</Text>
          </Button>
        </FooterTab>
      </Footer>
    </View>

    const verifyingConnection = <Content style={[styles.bgColor]}>
      <View padder style={[styles.bgColor]}>
        {(!this.state.exceedWaiting && !this.state.addedDevice) && (
          <View>
            <Text style={[styles.txtColor]}>Waiting for chargepoint to connect to the internet. This may take up to 30 seconds...</Text>
            <Spinner />
          </View>
        )}

        {this.state.addedDevice && (
          <Text style={[styles.txtColor, {fontSize: 25, textAlign: 'center'}]}>Device added.</Text>
        )
        }

        {(this.state.exceedWaiting && !this.state.addedDevice) && (
          <Text style={[styles.txtColor, {fontSize: 25, textAlign: 'center'}]}>Please Try again later.</Text>
        )
        }
      </View>
    </Content>

    return (
      <Container>
        {stage === 1 && beforeYouStart}
        {stage === 2 && !connected && awaitingWifi}
        {stage === 2 && connected && listHotspots}
        {stage === 3 && verifyingConnection}
      </Container>)
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

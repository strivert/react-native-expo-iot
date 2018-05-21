import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  Button,
  Text,
  Spinner,
  View,
  Header,
  Content,
  Footer,
  FooterTab,
  Left,
  Body,
  Icon,
  Title,
  Container,
  H1,
} from 'native-base'
import {Modal} from 'react-native'
import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'
import {fetchId, fetchHotspots, configureAndConnectAp} from '../../../actions/chipActions'
import {createClaimCode} from '../../../actions/particleActions'
import Hotspots from './Hotspots'
import PasswordModal from './PasswordModal'
import {getDevice} from '../../../services/particleService'
import styles from '../../../styles'

class Setup extends Component {
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
          alert('Failed to create claim code')
        })
    }

    if (prevState.stage !== 3 && this.state.stage === 3) {
      this.verifyingConnectionInterval = this.setInterval(() => {
        getDevice(this.state.deviceId).then(() => {
          this.handleModalClose()
          this.props.handleClose(true)
        })
          .catch(() => {})
      }, 2000)
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
      .then(() => this.setState({stage: 3}))
      .catch(() => {
        alert('Connection failed')
      })
  }

  handleClickBeginSetup () {
    this.setState({stage: 2})
  }

  render () {
    const {
      fetchingHotspots,
      connected,
      attemptingConnection,
      creatingClaimCode,
      claimCode,
      handleClose,
    } = this.props

    const {
      handlePressScan,
      handleSelectHotspot,
      handleModalClose,
      handleSubmitConnect,
      handleClickBeginSetup,
    } = this

    const {selectedHotspot, stage, hotspots} = this.state

    const beforeYouStart = <View style={[styles.flex]}>
      <Content padder2>
        <H1 mt>Before you start, please ensure that:</H1>
        <Text mt>{'\u2022'} You are within 5m of your charge point</Text>
        <Text mt>{'\u2022'} You are also within range of your home wifi</Text>
        <Text mt>{'\u2022'} You know your home wifi password</Text>
        <Text mt>{'\u2022'} You have your Andersen setup pack with you</Text>
      </Content>
      <Footer>
        <FooterTab buttons>
          <Button onPress={handleClickBeginSetup}>
            <Text>Begin setup</Text>
          </Button>
        </FooterTab>
      </Footer>
    </View>

    const awaitingWifi = <Content>
      {creatingClaimCode && <Spinner />}
      {!creatingClaimCode && claimCode && <View padder2>
        <H1 bold>First, connect to the chargepoint with your phone</H1>
        <Text bold mt>Please select the network from your Andersen chargepoint.</Text>
        <Text mt>The network name should appear as Andersen-XXXX</Text>
        <Text mt>Waiting for connection...</Text>
        <Spinner />
      </View>}
    </Content>

    const listHotspots = <View style={[styles.flex]}>
      <Content>
        <View padder>
          <Text>Select the wifi hotspot you wish to connect the chargepoint to:</Text>
        </View>
        {fetchingHotspots && <View padder>
          <Text>Searching for wifi hotspots...</Text>
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
        <FooterTab buttons>
          <Button disabled={fetchingHotspots} onPress={handlePressScan}>
            <Text>Scan for hotspots</Text>
          </Button>
        </FooterTab>
      </Footer>
    </View>

    const verifyingConnection = <Content>
      <View padder>
        <Text>Waiting for chargepoint to connect to the internet. This may take up to 30 seconds...</Text>
        <Spinner />
      </View>
    </Content>

    return <Modal
      onRequestClose={handleClose}
      animationType="slide"
      style={{flex: 1}}
    >
      <Container>
        <Header>
          <Left>
            <Button hasText transparent onPress={handleClose}>
              <Icon name="arrow-back" />
              <Text>Cancel</Text>
            </Button>
          </Left>
          <Body>
            <Title>Add Device</Title>
          </Body>
        </Header>
        {stage === 1 && beforeYouStart}
        {stage === 2 && !connected && awaitingWifi}
        {stage === 2 && connected && listHotspots}
        {stage === 3 && verifyingConnection}
      </Container>
    </Modal>
  }
}

reactMixin(Setup.prototype, TimerMixin)

Setup.propTypes = {
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
  handleClose: PropTypes.func.isRequired,
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
  }, dispatch)
)(Setup)

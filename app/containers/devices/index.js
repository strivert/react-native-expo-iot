import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  Text,
  Button,
  Card,
  CardItem,
  Footer,
  View,
  Body,
  FooterTab,
  Icon,
} from 'native-base'
import {ScrollView, RefreshControl} from 'react-native'
import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'
import {has} from 'lodash'
import {fetchDevices, setEnableCharging} from '../../actions/particleActions'
import styles from '../../styles'
import Setup from './setup'
import DeviceDetails from './DeviceDetails'

class Devices extends Component {
  constructor (props) {
    super(props)
    this.handleRefresh = this.handleRefresh.bind(this)
    this.handlePressAdd = this.handlePressAdd.bind(this)
    this.handleCloseAdd = this.handleCloseAdd.bind(this)
    this.handleToggleEnableCharging = this.handleToggleEnableCharging.bind(this)
    this.handlePressDetails = this.handlePressDetails.bind(this)

    this.state = {
      addModal: false,
      showDetails: {},
      loadingDevices: false,
      firstLoad: true,
    }
  }

  handleRefresh () {
    this.getDevices()
  }

  handlePressAdd () {
    this.setState({addModal: true})
  }

  handleCloseAdd (refresh) {
    this.setState({addModal: false})
    if (refresh) {
      this.getDevices()
    }
  }

  componentDidMount () {
    if (this.props.devices) {
      return
    }
    this.getDevices()
  }

  getDevices () {
    this.setState({loadingDevices: true})
    this.props.fetchDevices()
      .then(() => {
        if (this.state.firstLoad) {
          return this.setTimeout(() => this.setState({loadingDevices: false, firstLoad: false}), 1000)
        }

        this.setState({loadingDevices: false})
      })
  }

  handleToggleEnableCharging (deviceId, value) {
    this.props.setEnableCharging(deviceId, value)
  }

  handlePressDetails (deviceId) {
    const showDetails = Object.assign({}, this.state.showDetails)
    showDetails[deviceId] = !showDetails[deviceId]

    this.setState({showDetails})
  }

  render () {
    const {devices} = this.props
    const {handlePressAdd, handleCloseAdd, handleToggleEnableCharging, handlePressDetails, handleRefresh} = this
    const {addModal, showDetails, loadingDevices, firstLoad} = this.state

    if (addModal) {
      return <Setup handleClose={handleCloseAdd} />
    }

    return (
      <View style={[styles.flex]}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          refreshControl={<RefreshControl refreshing={loadingDevices} onRefresh={handleRefresh} />}
        >
          {!firstLoad && devices && devices.map((device, key) => <Card key={key}>
            <CardItem bordered>
              <Body>
                <View style={{flexDirection: 'row', marginBottom: 20}}>
                  <Text style={{flexBasis: '50%', marginRight: 10}} numberOfLines={1}>{device.name}:</Text>
                  {device.setupComplete && <Text style={{textAlign: 'center', flexGrow: 1, marginLeft: 10, marginRight: 20}}>
                    {!has(device, 'variables.enablecharging') || device.variables.enablecharging ? 'Unlocked' : 'Locked'}
                  </Text>}
                </View>
                {device.setupComplete && <View style={{flexDirection: 'row'}}>
                  <Text style={{flexBasis: '50%', marginRight: 10}}>Lock Chargepoint:</Text>
                  <Button style={{flexGrow: 1, borderRightWidth: 0, marginLeft: 10}}
                    andersenButton
                    andersenButtonBordered
                    andersenButtonOff={!has(device, 'variables.enablecharging') || !device.variables.enablecharging}
                    onPress={() => handleToggleEnableCharging(device.id, false)}
                  >
                    <Icon name="md-lock" />
                  </Button>
                  <Button style={{flexGrow: 1, marginRight: 20}}
                    andersenButton
                    andersenButtonBordered
                    andersenButtonOff={has(device, 'variables.enablecharging') && device.variables.enablecharging}
                    onPress={() => handleToggleEnableCharging(device.id, true)}
                  >
                    <Icon name="md-unlock" />
                  </Button>
                </View>}
              </Body>
            </CardItem>
            <CardItem bordered>
              <Button andersenButton onPress={() => handlePressDetails(device.id)}>
                <Text>{!device.setupComplete ? 'COMPLETE SETUP' : 'DETAILS'}</Text>
              </Button>
            </CardItem>
            {showDetails[device.id] && <CardItem>
              <DeviceDetails device={device} />
            </CardItem>}
          </Card>)}
        </ScrollView>
        <Footer>
          <FooterTab buttons>
            <Button onPress={handlePressAdd}>
              <Text>Add Device</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    )
  }
}

reactMixin(Devices.prototype, TimerMixin)

Devices.propTypes = {
  fetchDevices: PropTypes.func.isRequired,
  devices: PropTypes.array,
  setEnableCharging: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    devices: state.particle.devices,
  }),
  dispatch => bindActionCreators({fetchDevices, setEnableCharging}, dispatch)
)(Devices)

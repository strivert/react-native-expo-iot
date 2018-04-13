import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container } from 'native-base'

import {withRouter} from 'react-router-native'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'

import shallowCompare from 'react-addons-shallow-compare'

import ListItem from '../../components/home/ListItem'
import MapWrapper from '../../components/home/MapWrapper'
import {setEnableCharging} from '../../actions/particleActions'

class HomeContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedDeviceId: null,
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.state.selectedDeviceId && (nextProps.devices && nextProps.devices.length > 0)) {
      this.setState({
        selectedDeviceId: nextProps.devices[0].id,
      })
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  selectDevice (deviceId) {
    this.setState({
      selectedDeviceId: deviceId,
    })
  }

  checkKeyExist (key, object) {
    return (key in object)
  }

  catchCharFromChargerStatus (str) {
    if (str === '') {
      return str
    } else {
      return str.charAt(0)
    }
  }

  toHHMMSS (str) {
    let secNum = parseInt(str, 10) // don't forget the second param
    let hours = Math.floor(secNum / 3600)
    let minutes = Math.floor((secNum - (hours * 3600)) / 60)
    let seconds = secNum - (hours * 3600) - (minutes * 60)

    if (hours < 10) { hours = '0' + hours }
    if (minutes < 10) { minutes = '0' + minutes }
    if (seconds < 10) { seconds = '0' + seconds }
    return hours + ':' + minutes + ':' + seconds
  }

  render () {
    const { selectedDeviceId } = this.state

    if (!selectedDeviceId) {
      return null
    }

    // console.log('this.props.devicesHash', this.props.devicesHash)
    // console.log('this.props.devices', this.props.devices)

    const selectedDevice = this.props.devicesHash[selectedDeviceId]
    // console.log('selectedDevice', selectedDevice)
    let initStates = {
      'status': {
        't1Text': 'Status',
        't2Text': 'Offline',
        'iconName': 'ios-close-circle-outline',
        'iconSty': 'disableColor',
        't2Sty': 'disableColor',
        'hasSwitch': false,
      },
      'security': {
        't1Text': 'Security',
        't2Text': 'Unlocked',
        'iconName': 'ios-unlock-outline',
        'iconSty': 'disableColor',
        't2Sty': 'disableColor',
        'hasSwitch': true,
      },
      'charge': {
        't1Text': 'Last Charge',
        't2Text': '00:00:00',
        'iconName': 'ios-paper-outline',
        'iconSty': 'disableColor',
        't2Sty': 'disableColor',
        'hasSwitch': false,
      },
      'mainternance': {
        't1Text': 'Mainternance',
        't2Text': 'No Action',
        'iconName': 'ios-construct-outline',
        'iconSty': 'disableColor',
        't2Sty': 'disableColor',
        'hasSwitch': false,
      },
    }

    const evccoffline = this.checkKeyExist('evccoffline', selectedDevice['variables']) ? selectedDevice['variables']['evccoffline'] : undefined
    // console.log('evccoffline', selectedDevice['variables']['evccoffline'])
    if (evccoffline === true) {
      initStates['status']['t2Sty'] = 'grayColor'
      initStates['status']['iconSty'] = 'grayColor'
      initStates['security']['t2Sty'] = 'grayColor'
      initStates['security']['iconSty'] = 'grayColor'
      initStates['charge']['t2Sty'] = 'grayColor'
      initStates['charge']['iconSty'] = 'grayColor'
      initStates['mainternance']['t2Sty'] = 'grayColor'
      initStates['mainternance']['iconSty'] = 'grayColor'
    }
    if (evccoffline === false) {
      initStates['mainternance']['t2Sty'] = 'grayColor'
      initStates['mainternance']['iconSty'] = 'grayColor'

      const enablecharger = this.checkKeyExist('enablecharger', selectedDevice['variables']) ? selectedDevice['variables']['enablecharger'] : false
      if (enablecharger) {
        initStates['security']['t2Text'] = 'Unlocked'
        initStates['security']['t2Sty'] = 'grayColor'
        initStates['security']['iconName'] = 'ios-unlock-outline'
        initStates['security']['iconSty'] = 'grayColor'
      } else {
        initStates['security']['t2Text'] = 'Locked'
        initStates['security']['t2Sty'] = 'purpleColor'
        initStates['security']['iconName'] = 'ios-lock-outline'
        initStates['security']['iconSty'] = 'purpleColor'
      }

      const chargerstatus = this.checkKeyExist('chargerstatus', selectedDevice['variables']) ? selectedDevice['variables']['chargerstatus'] : ''
      const lastchargingtime = this.checkKeyExist('lastchargingtime', selectedDevice['variables']) ? selectedDevice['variables']['lastchargingtime'] : ''
      // console.log('this.catchCharFromChargerStatus(chargerstatus)', this.catchCharFromChargerStatus(chargerstatus))
      switch (this.catchCharFromChargerStatus(chargerstatus)) {
        case '':
          initStates['status']['t2Text'] = 'Offline'
          initStates['status']['t2Sty'] = 'grayColor'
          initStates['status']['iconName'] = 'ios-close-circle-outline'
          initStates['status']['iconSty'] = 'grayColor'
          break
        case 'A':
          initStates['status']['t2Text'] = 'Ready'
          initStates['status']['t2Sty'] = 'blueColor'
          initStates['status']['iconName'] = 'ios-checkmark-circle-outline'
          initStates['status']['iconSty'] = 'blueColor'
          break
        case 'B':
          initStates['status']['t2Text'] = 'Connected'
          initStates['status']['t2Sty'] = 'orangeColor'
          initStates['status']['iconName'] = 'ios-link-outline'
          initStates['status']['iconSty'] = 'orangeColor'
          break
        case 'C':
        case 'D':
          initStates['status']['t2Text'] = 'Charging'
          initStates['status']['t2Sty'] = 'greenColor'
          initStates['status']['iconName'] = 'ios-thunderstorm-outline'
          initStates['status']['iconSty'] = 'greenColor'
          break
      }
      switch (this.catchCharFromChargerStatus(chargerstatus)) {
        case '':
        case 'A':
        case 'B':
          initStates['charge']['t1Text'] = 'Last Charge'
          initStates['charge']['t2Text'] = this.toHHMMSS(lastchargingtime) // to be
          initStates['charge']['t2Sty'] = 'grayColor'
          initStates['charge']['iconName'] = 'ios-link-outline'
          initStates['charge']['iconSty'] = 'grayColor'
          break
        case 'C':
        case 'D':
          initStates['charge']['t1Text'] = 'Charger Time'
          initStates['charge']['t2Text'] = this.toHHMMSS(lastchargingtime) // to be
          initStates['charge']['t2Sty'] = 'greenColor'
          initStates['charge']['iconSty'] = 'grayColor'
          break
      }
    }

    const deviceArr = this.props.devices.map((item, i) => {
      return {
        deviceId: item.id,
        deviceName: item.name,
        location: {
          latitude: this.checkKeyExist('location', item.variables) ? parseFloat(item.variables.location.latitude) : 0,
          longitude: this.checkKeyExist('location', item.variables) ? parseFloat(item.variables.location.longitude) : 0,
          latitudeDelta: this.checkKeyExist('location', item.variables) ? parseFloat(item.variables.location.latitudeDelta) : 0,
          longitudeDelta: this.checkKeyExist('location', item.variables) ? parseFloat(item.variables.location.longitudeDelta) : 0,
        },
      }
    })
    // console.log('deviceArr', 'deviceArr')
    return (
      <Container style={styles.homeWrapper}>
        <View style={{height: 207}}>
          <MapWrapper
            selectDevice={(deviceId) => this.selectDevice(deviceId)}
            mapData={deviceArr}
          />
        </View>

        <View style={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
          {
            ['status', 'security', 'charge', 'mainternance'].map((key, i) => {
              return (
                <ListItem
                  key={`listitem-${i}`}
                  iconName={initStates[key]['iconName']}
                  hasSwitch={initStates[key]['hasSwitch']}
                  iconSty={initStates[key]['iconSty']}
                  t2Sty={initStates[key]['t2Sty']}
                  t1Text={initStates[key]['t1Text']}
                  t2Text={initStates[key]['t2Text']}
                  isLast={ i === 3 }
                  setEnableCharging={this.props.setEnableCharging}
                  deviceId={this.state.selectedDeviceId}
                  isEnableSwitch={initStates['status']['t2Text'] === 'Ready'}
                />)
            })
          }
        </View>

      </Container>
    )
  }
}

// ios-unlock-outline
let styles = StyleSheet.create({
  homeWrapper: {
    backgroundColor: '#FFFFFF',
  },
})

HomeContainer.propTypes = {
  devicesHash: PropTypes.object,
  devices: PropTypes.array,
  setEnableCharging: PropTypes.func,
}

export default withRouter(connect(
  state => ({
    devicesHash: state.particle.devicesHash,
    devices: state.particle.devices,
  }),
  dispatch => bindActionCreators({setEnableCharging}, dispatch)
)(HomeContainer))
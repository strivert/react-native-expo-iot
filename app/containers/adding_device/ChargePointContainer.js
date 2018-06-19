import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { Container } from 'native-base'

import {withRouter} from 'react-router-native'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'

import styles from '../../styles'

import PageTop from '../../components/common/PageTop'
import Bar from '../../components/common/Bar'
import BlueBtn from '../../components/common/BlueBtn'
import Border from '../../components/common/Border'
import PageHeader from '../../components/common/PageHeader'
import Spinner from '../../components/common/Spinner'
import {selectedDeviceId as selectDevice} from '../../actions/particleActions'

class ChargePointContainer extends Component {
  constructor (props) {
    super(props)
    this.handlePressDevice = this.handlePressDevice.bind(this)
  }
  componentDidMount () {
    const fromIsFrom = this.props.navigation.getParam('isFrom', '')
    if (fromIsFrom === 'addAgain') {
      this.props.navigation.navigate('AddCharge')
    }
  }

  handlePressDevice (deviceId) {
    this.props.selectDevice(deviceId)
    this.props.navigation.navigate('ChargeSetting')
  }

  render () {
    const {devicesHash, selectedDeviceId, devices} = this.props
    const {handlePressDevice} = this

    if (this.props.deviceCount === 0) {
      return (
        <Container style={pageStyles.moreWrapper}>
          <PageHeader />
          <PageTop
            iconName='setting3'
            firstText=''
            secondText='No Points'
          />
          <Bar
            barText='Add Charge Point'
          />

          <BlueBtn style={[pageStyles.paddingLeftRight42, pageStyles.AppWrapper]} onClick={() => { this.props.navigation.navigate('AddCharge') }}>
            <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Add Charge Point</Text>
          </BlueBtn>
        </Container>
      )
    }

    if (!selectedDeviceId) {
      return (
        <Container style={[pageStyles.moreWrapper, {alignItems: 'center', justifyContent: 'center'}]}>
          <Spinner />
        </Container>
      )
    }
    const fromIsFrom = this.props.navigation.getParam('isFrom', '')
    if (fromIsFrom === 'addAgain') {
      return (
        <Container style={[pageStyles.moreWrapper, {alignItems: 'center', justifyContent: 'center'}]}>
          <Spinner />
        </Container>
      )
    }

    const selectedDevice = devicesHash[selectedDeviceId]

    if (!selectedDevice) {
      return (
        <Container style={[pageStyles.moreWrapper, {alignItems: 'center', justifyContent: 'center'}]}>
          <Spinner />
        </Container>
      )
    }

    return (
      <Container style={pageStyles.moreWrapper}>
        <PageHeader />
        <PageTop
          iconName='setting3'
          firstText='Manage'
          secondText='Charge Points'
        />

        <Bar
          barText='Your Charge Points'
        />

        <ScrollView>
          {devices.map((device, key) => ([
            <BlueBtn key={`${key}btn`} style={[pageStyles.currencyWrapper, pageStyles.paddingLeftRight49]} onClick={() => handlePressDevice(device.id)}>
              <View style={pageStyles.flexRowView}>
                <View style={{flex: 0.8}}>
                  <Text style={[styles.txtColor2, pageStyles.currenctyText, {fontFamily: 'Proxima_nova_ltsemibold'}]}>
                    {('variables' in device) ? device.variables.friendlyName : 'Undefined'}
                  </Text>
                </View>
                <View style={{flex: 0.2, alignItems: 'flex-end', justifyContent: 'center'}}>
                  <Image
                    style={{height: 22, width: 13}}
                    source={require('../../assets/images/page_icons/next.png')}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </BlueBtn>,
            <Border key={`${key}border`} style={pageStyles.marginLeftRight16} />,
          ]))}
        </ScrollView>

        <Bar
          barText='Add Charge Point'
        />

        <BlueBtn style={[pageStyles.paddingLeftRight42, pageStyles.AppWrapper]} onClick={() => { this.props.navigation.navigate('AddCharge') }}>
          <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Add Charge Point</Text>
        </BlueBtn>

      </Container>
    )
  }
}

let pageStyles = StyleSheet.create({
  moreWrapper: {
    backgroundColor: '#FFFFFF',
  },
  paddingLeftRight49: {
    paddingLeft: 36,
    paddingRight: 36,
  },
  paddingLeftRight42: {
    paddingLeft: 42,
    paddingRight: 42,
  },
  marginLeftRight16: {
    marginLeft: 16,
    marginRight: 16,
  },
  currencyWrapper: {
    paddingTop: 17,
    paddingBottom: 17,
  },
  flexRowView: {
    flexDirection: 'row',
  },
  currenctyText: {
    fontSize: 18,
  },
  percentText: {
    fontSize: 18,
  },
  nextText: {
    fontSize: 18,
  },
  AppWrapper: {
    paddingTop: 18,
    paddingBottom: 18,
  },
  appText: {
    fontSize: 18,
  },
})

ChargePointContainer.propTypes = {
  user: PropTypes.object,
  devicesHash: PropTypes.object,
  navigation: PropTypes.any,
  selectedDeviceId: PropTypes.any,
  isFrom: PropTypes.any,
  deviceCount: PropTypes.any,
  selectDevice: PropTypes.func,
  devices: PropTypes.array,
}

export default withRouter(connect(
  state => ({
    devicesHash: state.particle.devicesHash,
    devices: state.particle.devices,
    selectedDeviceId: state.particle.selectedDeviceId,
    user: state.user,
    deviceCount: state.particle.deviceCount,
  }),
  dispatch => bindActionCreators({selectDevice}, dispatch)
)(ChargePointContainer))

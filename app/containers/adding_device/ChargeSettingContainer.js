import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Container } from 'native-base'

import {withRouter} from 'react-router-native'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import styles from '../../styles'

import Bar from '../../components/common/Bar'
import BlueBtn from '../../components/common/BlueBtn'

import { MapView } from 'expo'

class ChargeSettingContainer extends Component {
  render () {
    const {devicesHash, selectedDeviceId, user} = this.props
    const selectedDevice = devicesHash[selectedDeviceId]

    const deviceName = selectedDevice.name
    const deviceSerialNumber = ('variables' in selectedDevice) ? selectedDevice.variables.serialNumber : ''
    const userAddress1 = user.address1

    let locationItem = {
      location: {
        latitude: ('variables' in selectedDevice) ? parseFloat(parseFloat(selectedDevice.variables.location.latitude).toFixed(10)) : 0,
        longitude: ('variables' in selectedDevice) ? parseFloat(parseFloat(selectedDevice.variables.location.longitude).toFixed(10)) : 0,
        // latitudeDelta: this.checkKeyExist('location', item.variables) ? parseFloat(item.variables.location.latitudeDelta) : 0,
        // longitudeDelta: this.checkKeyExist('location', item.variables) ? parseFloat(item.variables.location.longitudeDelta) : 0,
        latitudeDelta: 0.017,
        longitudeDelta: 0.017,
      },
    }

    return (
      <Container style={pageStyles.moreWrapper}>
        <View style={{marginTop: 20}}></View>
        <Bar
          barText='Name'
        />

        <View style={[pageStyles.flexRowView, pageStyles.currencyWrapper, pageStyles.paddingLeftRight49]}>
          <View style={{flex: 0.8}}>
            <Text style={[styles.txtColor2, pageStyles.currenctyText]}>{deviceName}</Text>
          </View>
          <View style={{flex: 0.2, alignItems: 'flex-end'}}>
            <BlueBtn style={[]} onClick={() => {}}>
              <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Edit</Text>
            </BlueBtn>
          </View>
        </View>

        <Bar
          barText='Serial No'
        />

        <View style={[pageStyles.flexRowView, pageStyles.currencyWrapper, pageStyles.paddingLeftRight49]}>
          <View style={{}}>
            <Text style={[styles.txtColor2, pageStyles.currenctyText]}>{deviceSerialNumber}</Text>
          </View>
        </View>

        <Bar
          barText='Location'
        />

        <View style={[pageStyles.flexRowView, pageStyles.currencyWrapper, pageStyles.paddingLeftRight49]}>
          <View style={{flex: 0.8}}>
            <Text style={[styles.txtColor2, pageStyles.currenctyText]}>{userAddress1}</Text>
          </View>
          <View style={{flex: 0.2, alignItems: 'flex-end'}}>
            <BlueBtn style={[]} onClick={() => {}}>
              <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Edit</Text>
            </BlueBtn>
          </View>
        </View>

        <View style={{ height: 400 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: locationItem.location.latitude + 0.004,
              longitude: locationItem.location.longitude - 0.015,
              latitudeDelta: locationItem.location.latitudeDelta,
              longitudeDelta: locationItem.location.longitudeDelta,
            }}
          >
            <MapView.Marker
              // coordinate={item.location}
              coordinate={{
                latitude: locationItem.location.latitude,
                longitude: locationItem.location.longitude,
              }}
            />
          </MapView>
        </View>
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

ChargeSettingContainer.propTypes = {
  user: PropTypes.object,
  devicesHash: PropTypes.object,
  selectedDeviceId: PropTypes.any,
}

export default withRouter(connect(
  state => ({
    devicesHash: state.particle.devicesHash,
    selectedDeviceId: state.particle.selectedDeviceId,
    user: state.user,
  }),
  null
)(ChargeSettingContainer))

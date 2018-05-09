import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Container } from 'native-base'

import {withRouter} from 'react-router-native'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import styles from '../../styles'

import PageTop from '../../components/common/PageTop'
import Bar from '../../components/common/Bar'
import BlueBtn from '../../components/common/BlueBtn'
import Border from '../../components/common/Border'

class ChargePointContainer extends Component {
  render () {
    const {devicesHash, selectedDeviceId, user} = this.props
    if (!selectedDeviceId) {
      return null
    }
    const selectedDevice = devicesHash[selectedDeviceId]

    const deviceName = selectedDevice.name
    const userAddress1 = user.address1
    const userAddress2 = user.address2

    return (
      <Container style={pageStyles.moreWrapper}>
        <PageTop
          iconName='setting3'
          firstText='Manage'
          secondText='Charge Points'
        />

        <Bar
          barText='Your Charge Points'
        />

        <BlueBtn style={[pageStyles.currencyWrapper, pageStyles.paddingLeftRight49]} onClick={() => { this.props.navigation.navigate('ChargeSetting') }}>
          <View style={pageStyles.flexRowView}>
            <View style={{flex: 0.8}}>
              <Text style={[styles.txtColor2, pageStyles.currenctyText]}>{deviceName}</Text>
            </View>
            <View style={{flex: 0.2, alignItems: 'flex-end'}}>
              <Image
                style={{height: 22, width: 13}}
                source={require('../../assets/images/page_icons/next.png')}
                resizeMode="contain"
              />
            </View>
          </View>
        </BlueBtn>

        <Border style={pageStyles.marginLeftRight16} />

        {
          userAddress1 ? (
            <BlueBtn style={[pageStyles.currencyWrapper, pageStyles.paddingLeftRight49]} onClick={() => { this.props.navigation.navigate('ChargeSetting') }}>
              <View style={pageStyles.flexRowView}>
                <View style={{flex: 0.8}}>
                  <Text style={[styles.txtColor2, pageStyles.currenctyText]}>{userAddress1}</Text>
                </View>
                <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                  <Image
                    style={{height: 22, width: 13}}
                    source={require('../../assets/images/page_icons/next.png')}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </BlueBtn>
          ) : null
        }

        {
          userAddress1 ? (
            <Border style={pageStyles.marginLeftRight16} />
          ) : null
        }

        {
          userAddress2 ? (
            <BlueBtn style={[pageStyles.currencyWrapper, pageStyles.paddingLeftRight49]} onClick={() => { this.props.navigation.navigate('ChargeSetting') }}>
              <View style={pageStyles.flexRowView}>
                <View style={{flex: 0.8}}>
                  <Text style={[styles.txtColor2, pageStyles.currenctyText]}>{userAddress2}</Text>
                </View>
                <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                  <Image
                    style={{height: 22, width: 13}}
                    source={require('../../assets/images/page_icons/next.png')}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </BlueBtn>
          ) : null
        }

        {
          userAddress2 ? (
            <Border style={[pageStyles.marginLeftRight16, {marginBottom: 60}]} />
          ) : null
        }

        <Bar
          barText='Add Charge Point'
        />

        <BlueBtn style={[pageStyles.paddingLeftRight42, pageStyles.AppWrapper]} onClick={() => { this.props.navigation.navigate('AddCharge') }}>
          <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>App Support</Text>
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
}

export default withRouter(connect(
  state => ({
    devicesHash: state.particle.devicesHash,
    selectedDeviceId: state.particle.selectedDeviceId,
    user: state.user,
  }),
  null
)(ChargePointContainer))
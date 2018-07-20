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
import PageHeaderBack from '../../components/common/PageHeaderBack'
import Spinner from '../../components/common/Spinner'
import {selectedDeviceId as selectDevice} from '../../actions/particleActions'

class ChargeHistoryContainer extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Container style={pageStyles.moreWrapper}>
        <PageHeaderBack pageName='Home' isGoBack={true} {...this.props} />
        <PageTop
          iconName='charge1'
          firstText='Charge History'
          secondText='Last XX Days'
        />

        <Bar
          barText='Your Charge Points'
        />

        <View style={[pageStyles.paddingLeftRight42, pageStyles.AppWrapper]}>
          <View style={pageStyles.flexRowView}>
            <View style={{flex: 0.6}}>
              <Text style={[styles.txtColor2, pageStyles.appText]}>Energy</Text>
            </View>
            <View style={{flex: 0.4}}>
              <Text style={[styles.txtColor2, pageStyles.appText]}>4.3.4</Text>
            </View>
          </View>
        </View>

        <Border style={pageStyles.marginLeftRight16} />

        <View style={[pageStyles.paddingLeftRight42, pageStyles.AppWrapper]}>
          <View style={pageStyles.flexRowView}>
            <View style={{flex: 0.6}}>
              <Text style={[styles.txtColor2, pageStyles.appText]}>Energy</Text>
            </View>
            <View style={{flex: 0.4}}>
              <Text style={[styles.txtColor2, pageStyles.appText]}>4.3.4</Text>
            </View>
          </View>
        </View>

        <Border style={pageStyles.marginLeftRight16} />

        <View style={[pageStyles.paddingLeftRight42, pageStyles.AppWrapper]}>
          <View style={pageStyles.flexRowView}>
            <View style={{flex: 0.6}}>
              <Text style={[styles.txtColor2, pageStyles.appText]}>Energy</Text>
            </View>
            <View style={{flex: 0.4}}>
              <Text style={[styles.txtColor2, pageStyles.appText]}>4.3.4</Text>
            </View>
          </View>
        </View>

        <Bar
          barText='01-04-18'
        />

        <View style={[pageStyles.paddingLeftRight42, pageStyles.AppWrapper]}>
          <View style={pageStyles.flexRowView}>
            <View style={{flex: 0.6}}>
              <Text style={[styles.txtColor2, pageStyles.appText]}>Energy</Text>
            </View>
            <View style={{flex: 0.4}}>
              <Text style={[styles.txtColor2, pageStyles.appText]}>4.3.4</Text>
            </View>
          </View>
        </View>

        <Border style={pageStyles.marginLeftRight16} />

        <View style={[pageStyles.paddingLeftRight42, pageStyles.AppWrapper]}>
          <View style={pageStyles.flexRowView}>
            <View style={{flex: 0.6}}>
              <Text style={[styles.txtColor2, pageStyles.appText]}>Energy</Text>
            </View>
            <View style={{flex: 0.4}}>
              <Text style={[styles.txtColor2, pageStyles.appText]}>4.3.4</Text>
            </View>
          </View>
        </View>

        <Border style={pageStyles.marginLeftRight16} />

        <View style={[pageStyles.paddingLeftRight42, pageStyles.AppWrapper]}>
          <View style={pageStyles.flexRowView}>
            <View style={{flex: 0.6}}>
              <Text style={[styles.txtColor2, pageStyles.appText]}>Energy</Text>
            </View>
            <View style={{flex: 0.4}}>
              <Text style={[styles.txtColor2, pageStyles.appText]}>4.3.4</Text>
            </View>
          </View>
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

ChargeHistoryContainer.propTypes = {
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
)(ChargeHistoryContainer))

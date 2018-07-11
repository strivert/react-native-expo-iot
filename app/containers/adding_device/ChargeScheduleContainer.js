import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { Container, CheckBox } from 'native-base'

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
import {
  postSetEnableSchedule,
} from '../../services/particleService'

import Picker from 'react-native-roll-picker'

let minutesData = []
for (let i = 0; i < 60; i++ ) {
  minutesData.push({i: i})
}

let hoursData = []
for (let i = 0; i < 24; i++ ) {
    hoursData.push({i: i})
}


class ChargeScheduleContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hour: null,
      min: null,
      dailyenable: false,
    }
  }

  componentDidMount () {
    const {devicesHash, selectedDeviceId, devices} = this.props
    const selectedDevice = devicesHash[selectedDeviceId]

    let chargetimer = this.checkKeyExist('chargetimer', selectedDevice['variables']) ? JSON.parse(selectedDevice['variables']['chargetimer']) : false
    let dailyenable = chargetimer ? chargetimer[0]['dailyenable'] : false
    let hour = chargetimer ? chargetimer[0]['hour'] : 0
    let min = chargetimer ? chargetimer[0]['min'] : 0
    this.setState({
      dailyenable,
      hour,
      min
    })
  }

  componentWillReceiveProps (nextProps) {
    /*
    const {devicesHash, selectedDeviceId, devices} = nextProps
    const selectedDevice = devicesHash[selectedDeviceId]

    let chargetimer = this.checkKeyExist('chargetimer', selectedDevice['variables']) ? JSON.parse(selectedDevice['variables']['chargetimer']) : false

    let hour = chargetimer ? chargetimer[0]['hour'] : 0
    let min = chargetimer ? chargetimer[0]['min'] : 0
    // console.log('hour', hour)
    this.setState({
      hour,
      min
    })
    */

  }
  

  checkKeyExist (key, object) {
    return (key in object)
  }

  postSchedule = () => {
    const {selectedDeviceId} = this.props
    let hour = this.state.hour
    let min = this.state.min
    let enabled = this.state.dailyenable

	  postSetEnableSchedule(selectedDeviceId, `{chargetimer:[{hour:${hour}, min:${min}, dailyenable:${enabled}, active:false}]}`)
      .then((a) => {
      })
      .catch((err) => {
          console.log(err)
      })
  }

  render () {
    if (!this.state.hour) {
      return null;
    }
    return (
      <Container style={pageStyles.moreWrapper}>
        <PageHeader />
        <Bar
          barText='Scheduled Charge Time'
        />
        <View style = {{height: 15}} />
        <View style = {{height: 225, flexDirection: 'row'}}>
          <View style = {{flex: 1}}>
            <Picker 
              data = {hoursData}
              ref = '_Picker1'
              name = 'i'
              pickerStr={'hour'}
              pickerBigFontSize={30}
              onRowChange = {index => {
                console.log('index', index)
                this.setState({
                  hour: index
                })
              }}
              selectTo={this.state.hour}
            />
          </View>
          <View style = {{flex: 1}}>
            <Picker 
              data = {minutesData}
              ref = '_Picker0'
              name = 'i'
              pickerStr={'min'}
              selectTo={this.state.min}
              onRowChange = {index => {
                this.setState({
                  min: index
                })
              }}
            />
          </View>
        </View>
        <View style = {{height: 15}} />

        <ScrollView style={[{flex: 1}, pageStyles.moreWrapper]}>
            <BlueBtn style={[pageStyles.currencyWrapper, pageStyles.paddingLeftRight49]} onClick={()=>{}}>
            <View style={pageStyles.flexRowView}>
                <View style={{flex: 0.8, justifyContent: 'center'}}>
                <Text style={[styles.txtColor2, pageStyles.currenctyText]}>Enable Daily Charger Timer</Text>
                </View>
                <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                {
                  <CheckBox
                      checked={this.state.dailyenable}
                      style={{ marginRight: 20 }}
                      color={'#E8E3E3'}
                      onPress={() => {
                        this.setState({
                          dailyenable: !this.state.dailyenable
                        })
                      }}
                  />
                }
                </View>
            </View>
            </BlueBtn>

            <Border style={pageStyles.marginLeftRight16} />
            <View style={[styles.flexCenter, pageStyles.AppWrapper]}>
                <Text style={[styles.txtColor2, {fontSize: 20}]}>Scheduled Timer</Text>
                <Text style={[styles.txtColor, {fontSize: 35}]}>Not Set</Text>
            </View>
            <Border style={pageStyles.marginLeftRight16} />
        
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={pageStyles.menuBar}>
                    <BlueBtn onClick={() => {}}>
                        <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Cancel</Text>
                    </BlueBtn>
                    <BlueBtn onClick={() => this.postSchedule()}>
                        <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Continue</Text>
                    </BlueBtn>
                </View>
            </View>
        </ScrollView>
      </Container>
    )
  }
}

let pageStyles = StyleSheet.create({
  menuBar: {
    flexDirection: 'row', padding: 20, justifyContent: 'space-between',
  },
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

ChargeScheduleContainer.propTypes = {
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
)(ChargeScheduleContainer))

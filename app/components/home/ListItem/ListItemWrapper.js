import React, { Component } from 'react'
import { Text } from 'native-base'
import { StyleSheet, View, Image, Dimensions, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
// import ToggleSwitch from 'toggle-switch-react-native'
// import * as Animatable from 'react-native-animatable'
import Swipeout from 'react-native-swipeout'

const { width } = Dimensions.get('window')

getAdjustedFontSize1 = (size) => {
  return width > 320 ? size : 12
}
getAdjustedFontSize2 = (size) => {
  return width > 320 ? size : 20
}

const LockCompoment = ({textValue}) => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text style={{fontSize: 25, color: 'white'}}>{textValue}</Text></View>
)

LockCompoment.propTypes = {
  textValue: PropTypes.string,
}

class ListItemWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      switchValue: false,
      switchValueExam: false,
      switchSolarValue: false,
      switchScheduleValue: false,
      fontSize: 10,
    }

    this.statusIcons = {
      'charge1': require('../../../assets/images/status_icons/charge1.png'),
      'charge2': require('../../../assets/images/status_icons/charge2.png'),
      'charge-disable': require('../../../assets/images/status_icons/charge-disable.png'),
      'maintenance1': require('../../../assets/images/status_icons/maintenance1.png'),
      'maintenance2': require('../../../assets/images/status_icons/maintenance2.png'),
      'maintenance1-disable': require('../../../assets/images/status_icons/maintenance1-disable.png'),
      'security1': require('../../../assets/images/status_icons/security1.png'),
      'security1-disable': require('../../../assets/images/status_icons/security1-disable.png'),
      'security2': require('../../../assets/images/status_icons/security2.png'),
      'security3': require('../../../assets/images/status_icons/security3.png'),
      'security4': require('../../../assets/images/status_icons/security4.png'),
      'security5': require('../../../assets/images/status_icons/security5.png'),
      'security6': require('../../../assets/images/status_icons/security6.png'),
      'status1': require('../../../assets/images/status_icons/status1.png'),
      'status2': require('../../../assets/images/status_icons/status2.png'),
      'status3': require('../../../assets/images/status_icons/status3.png'),
      'status4': require('../../../assets/images/status_icons/status4.png'),
      'status5': require('../../../assets/images/status_icons/status5.png'),
      'status5-disable': require('../../../assets/images/status_icons/status5-disable.png'),
      'status6': require('../../../assets/images/status_icons/status6.png'),
      'status7': require('../../../assets/images/status_icons/status7.png'),
      'status7-disable': require('../../../assets/images/status_icons/status7-disable.png'),
      'status8': require('../../../assets/images/status_icons/status8.png'),
      'cost1': require('../../../assets/images/status_icons/cost1.png'),
      'power1': require('../../../assets/images/status_icons/power1.png'),
      'cost2': require('../../../assets/images/status_icons/cost2.png'),
      'power2': require('../../../assets/images/status_icons/power2.png'),
	    'power3': require('../../../assets/images/status_icons/power3.png'),
      'solar1': require('../../../assets/images/status_icons/solar1.png'),
      'solar1-disable': require('../../../assets/images/status_icons/solar1-disable.png'),
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.hasSwitch) {
      if (nextProps.t2Text === 'Locked') {
        this.setState({
          switchValue: true,
        })
      }
      if (nextProps.t2Text === 'Unlocked') {
        this.setState({
          switchValue: false,
        })
      }
    }

	  if (nextProps.hasSolarSwitch) {
      this.setState({
        switchSolarValue: nextProps.ecomode ? true : false,
      })
    }

    if (nextProps.hasScheduleSwitch) {
      this.setState({
        switchScheduleValue: nextProps.dailyenable ? true : false,
      })
    }
  }

  reviewRow = () => {

  }

  render () {
    const {iconName, t1Text, t2Text, t2Sty, hasSwitch, isLast, switchSty, isEnableSwitch, hasSolarSwitch, hasScheduleSwitch} = this.props
    // const {iconSty} = this.props

    // item wrapper style
    let itemWrapperStyles = [styles.itemWrapper]
    isLast && itemWrapperStyles.push(styles.noBorder)

    // left icon style
    let iconStyles = [styles.iconStyle]
    // iconSty && iconStyles.push(styles[iconSty])

    // body style
    let bodyStyles = [styles.bodyCtr]
    hasSwitch && bodyStyles.push(styles.flex_6)
    hasSolarSwitch && bodyStyles.push(styles.flex_6)
    hasScheduleSwitch && bodyStyles.push(styles.flex_6)

    // first text style
    let t1Styles = [styles.t1]

    // second text style
    let t2Styles = [styles.t2]
    t2Sty && t2Styles.push(styles[t2Sty])

    // switch style
    let switchStyles = []
    switchSty && switchStyles.push(styles[switchSty])

    let swipeBtnOption = []
    const _this = this
    if (this.state.switchValue) {
      swipeBtnOption = [
        {
          text: 'Unlock',
          backgroundColor: '#2F96DA',
          onPress: () => {
            _this.setState({
              switchValue: false,
            })
            _this.props.setEnableCharging(_this.props.deviceId, false)
          },
          component: <LockCompoment textValue={'Unlock'} />,
        },
      ]
    } else {
      swipeBtnOption = [
        {
          text: 'Lock',
          backgroundColor: '#959595',
          onPress: () => {
            _this.setState({
              switchValue: true,
            })
            _this.props.setEnableCharging(_this.props.deviceId, true)
          },
          component: <LockCompoment textValue={'Lock'} />,
        },
      ]
    }

    let swipeSolarBtnOption = []
    if (this.state.switchSolarValue) {
      swipeSolarBtnOption = [
        {
          text: 'eco',
          backgroundColor: '#3FAF51',
          onPress: () => {
            _this.setState({
              switchSolarValue: false,
            })
            _this.props.setEnableEco(_this.props.deviceId, false)
          },
          component: <LockCompoment textValue={'eco'} />,
        },
      ]
    } else {
      swipeSolarBtnOption = [
        {
          text: 'eco',
          backgroundColor: '#959595',
          onPress: () => {
            _this.setState({
              switchSolarValue: true,
            })
            _this.props.setEnableEco(_this.props.deviceId, true)
          },
          component: <LockCompoment textValue={'eco'} />,
        },
      ]
    }

    let swipeScheduleBtnOption = []
    if (this.state.switchScheduleValue) {
      swipeScheduleBtnOption = [
        {
          text: 'On',
          backgroundColor: '#2F96DA',
          onPress: () => {
            _this.setState({
              switchScheduleValue: false,
            })
            _this.props.postSchedule(_this.props.deviceId, false)
          },
          component: <LockCompoment textValue={'On'} />,
        },
      ]
    } else {
      swipeScheduleBtnOption = [
        {
          text: 'Off',
          backgroundColor: '#959595',
          onPress: () => {
            _this.setState({
              switchScheduleValue: true,
            })
            _this.props.postSchedule(_this.props.deviceId, true)
          },
          component: <LockCompoment textValue={'Off'} />,
        },
      ]
    }

    const {width, height} = Dimensions.get('window')
    const rowHeight = Math.floor( (height - 24 - 207 - 55) / 5 )

    let renderItem = null;

    if (hasSwitch && isEnableSwitch) {
      renderItem = 
          <Swipeout
            backgroundColor={'white'}
            right={swipeBtnOption}
            style={{flex: 1, borderColor: '#959595', borderWidth: 0, borderBottomWidth: 0.5, paddingLeft: 20, paddingRight: 20, height: rowHeight}}
            // style={{flex: 1, borderColor: '#959595', borderWidth: 0, borderBottomWidth: 0.5, paddingLeft: 20, paddingRight: 20}}
            buttonWidth={120}
            autoClose={true}
          >
            <View style={{height: '100%', flexDirection: 'row', backgroundColor: 'white', alignItems: 'center'}}>
              <View style={styles.leftCtr}>
                <View style={{height: 10}}>
                  <Text style={t1Styles}></Text>
                </View>
                <View style={{marginBottom: 5}}>
                  <Image source={this.statusIcons[iconName]} style={iconStyles} resizeMode='contain' />
                </View>
              </View>
              <View style={bodyStyles}>
                <Text style={t1Styles}>{t1Text}</Text>
                <Text style={t2Styles}>{t2Text}</Text>
              </View>
              <View style={[styles.rightCtr, {flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}]}>
                <View style={{borderWidth: 1, borderColor: '#e8e3e3', width: 1, marginRight: 3, height: 25}}>
                </View>
                <View style={{borderWidth: 1, borderColor: '#e8e3e3', width: 1, height: 25}}>
                </View>
              </View>
            </View>
          </Swipeout>
    } else if (hasSolarSwitch) {
      renderItem = 
          <Swipeout
            backgroundColor={'white'}
            right={swipeSolarBtnOption}
            style={{flex: 1, borderColor: '#959595', borderWidth: 0, borderBottomWidth: 0.5, paddingLeft: 20, paddingRight: 20, height: rowHeight}}
            // style={{flex: 1, borderColor: '#959595', borderWidth: 0, borderBottomWidth: 0.5, paddingLeft: 20, paddingRight: 20}}
            buttonWidth={120}
            autoClose={true}
          >
            <View style={{height: '100%', flexDirection: 'row', backgroundColor: 'white', alignItems: 'center'}}>
              <View style={styles.leftCtr}>
                <View style={{height: 10}}>
                  <Text style={t1Styles}></Text>
                </View>
                <View style={{marginBottom: 5}}>
                  <Image source={this.statusIcons[iconName]} style={iconStyles} resizeMode='contain' />
                </View>
              </View>
              <View style={bodyStyles}>
                <Text style={t1Styles}>{t1Text}</Text>
                <Text style={t2Styles}>{t2Text}</Text>
              </View>
              <View style={[styles.rightCtr, {flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}]}>
                <View style={{borderWidth: 1, borderColor: '#e8e3e3', width: 1, marginRight: 3, height: 25}}>
                </View>
                <View style={{borderWidth: 1, borderColor: '#e8e3e3', width: 1, height: 25}}>
                </View>
              </View>
            </View>
          </Swipeout>
    } else if (hasScheduleSwitch) {
      renderItem = 
          <Swipeout
            backgroundColor={'white'}
            right={swipeScheduleBtnOption}
            style={{flex: 1, borderColor: '#959595', borderWidth: 0, borderBottomWidth: 0.5, height: rowHeight}}
            // style={{flex: 1, borderColor: '#959595', borderWidth: 0, borderBottomWidth: 0.5, paddingLeft: 20, paddingRight: 20}}
            buttonWidth={120}
            autoClose={true}
          >
            <View style={{height: '100%', flexDirection: 'row', backgroundColor: 'white', alignItems: 'center'}}>
              <TouchableHighlight
                style={{flex: 1}}
                onLongPress={() => {
                  this.props.goChargeSchedule()
                }}
                underlayColor='#cccccc'
              >
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', paddingLeft: 20, paddingRight: 20}}>
                  <View style={styles.leftCtr}>
                    <View style={{height: 10}}>
                      <Text style={t1Styles}></Text>
                    </View>
                    <View style={{marginBottom: 5}}>
                      <Image source={this.statusIcons[iconName]} style={iconStyles} resizeMode='contain' />
                    </View>
                  </View>
                  <View style={bodyStyles}>
                    <Text style={t1Styles}>{t1Text}</Text>
                    <Text style={t2Styles}>{t2Text}</Text>
                  </View>
                  <View style={[styles.rightCtr, {flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}]}>
                    <View style={{borderWidth: 1, borderColor: '#e8e3e3', width: 1, marginRight: 3, height: 25}}>
                    </View>
                    <View style={{borderWidth: 1, borderColor: '#e8e3e3', width: 1, height: 25}}>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          </Swipeout>
    } else {
	  // renderItem = <View style={[itemWrapperStyles]}>
      renderItem = <View style={[itemWrapperStyles, {height: rowHeight}]}>
        <View style={styles.leftCtr}>
          <View style={{height: 10}}>
            <Text style={t1Styles}></Text>
          </View>
          <View style={{marginBottom: 5}}>
            <Image source={this.statusIcons[iconName]} style={iconStyles} resizeMode='contain' />
          </View>
        </View>
        <View style={bodyStyles}>
          <Text style={t1Styles}>{t1Text}</Text>
          <Text style={t2Styles}>{t2Text}</Text>
        </View>
      </View>
    }

    return (renderItem)
  }
}

let styles = StyleSheet.create({
  itemWrapper: {
    flex: 1, flexDirection: 'row', borderColor: '#959595', borderWidth: 0, borderBottomWidth: 0.5, alignItems: 'center', paddingLeft: 20, paddingRight: 20,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  iconStyle: {
    height: '95%',
    maxHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftCtr: {
    flex: 0.2,
    flexDirection: 'column',
    alignItems: 'center',
  },
  rightCtr: {
    flex: 0.1,
  },
  bodyCtr: {
    flexDirection: 'column', flex: 0.8,
  },
  flex_6: {
    flex: 0.7,
  },
  t1: {
    color: '#707070',
    fontSize: getAdjustedFontSize1(17),
    fontFamily: 'Proxima_nova_light',
  },
  t2: {
    color: '#707070',
    fontSize: getAdjustedFontSize2(32),
    fontFamily: 'Proxima_nova_light',
  },

  blueColor: {
    color: '#218FD8',
  },
  orangeColor: {
    color: '#F58533',
  },
  greenColor: {
    color: '#3FAF51',
  },
  purpleColor: {
    color: '#6C3D90',
  },
  redColor: {
    color: '#E33535',
  },
  yellowColor: {
    color: '#FFC400',
  },
  grayColor: {
    color: '#707070',
  },
  disableColor: {
    color: '#E8E3E3',
  },
})

ListItemWrapper.propTypes = {
  iconName: PropTypes.string,
  iconSty: PropTypes.string,
  t1Text: PropTypes.string,
  t2Text: PropTypes.string,
  t2Sty: PropTypes.string,
  hasSwitch: PropTypes.bool,
  isLast: PropTypes.bool,
  switchSty: PropTypes.string,
  setEnableCharging: PropTypes.func,
  deviceId: PropTypes.string,
  isEnableSwitch: PropTypes.bool,
}

export default ListItemWrapper

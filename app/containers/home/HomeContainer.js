import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native'
import { Container } from 'native-base'

import {withRouter} from 'react-router-native'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'

// import shallowCompare from 'react-addons-shallow-compare'
import odiff from 'odiff'

import ListItem from '../../components/home/ListItem'
import MapWrapper from '../../components/home/MapWrapper'
import SolarModal from '../../components/home/SolarModal'
import {setEnableCharging, selectedDeviceId} from '../../actions/particleActions'
import Spinner from '../../components/common/Spinner'
import PageHeader from '../../components/common/PageHeader'
import PageTop from '../../components/common/PageTop'
import Bar from '../../components/common/Bar'
import BlueBtn from '../../components/common/BlueBtn'
import appStyles from '../../styles'
import {
  postSetEcoMode, postSetEnableSchedule,
} from '../../services/particleService'

class HomeContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedDeviceId: null,
      visibleTabBar: false,
	  visibleSolarModal: false,
    }
  }

  componentWillReceiveProps (nextProps) {
    /*
    if (nextProps.devices && nextProps.deviceCount !== nextProps.devices.length) {
      this.setState({
        selectedDeviceId: null,
      })
    }
    */
    if ( nextProps.devices && nextProps.devices.length > 0) {
      if (nextProps.deviceCount === nextProps.devices.length) {
        if (!this.state.selectedDeviceId) {
          this.setState({
            selectedDeviceId: nextProps.devices[0].id,
          })
          this.props.selectedDeviceId(nextProps.devices[0].id)
        }
      }
      // for add
      if (nextProps.deviceCount === nextProps.devices.length) {
        if (this.props.devices && this.props.devices.length != nextProps.devices.length) {
          if (this.state.selectedDeviceId !== null) {
            this.setState({
              selectedDeviceId: nextProps.devices[0].id,
            })
            this.props.selectedDeviceId(nextProps.devices[0].id)
          }
        }
      }
    }    
  }
  

  /*
  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  */
  shouldComponentUpdate (nextProps, nextState) {
    if (odiff.equal(this.props, nextProps) && odiff.equal(this.state, nextState)) {
      return false
    } else {
      return true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedDeviceId } = prevState

    if (this.props.deviceCount === 0) {
      this.setState({
        visibleTabBar: true
      }, () => {
        this.props.setTabVisible()
      })
      return
    }

    if ( !prevProps.token) {
      this.setState({
        visibleTabBar: false,
      })
      return
    }

    if (!selectedDeviceId) {
      this.setState({
        visibleTabBar: false,
      })
      return
    }

    const selectedDevice = prevProps.devicesHash[selectedDeviceId]
    if( !selectedDevice || !this.checkKeyExist('variables', selectedDevice) || !selectedDevice['variables']) {
      return
    }

    this.setState({
      visibleTabBar: true
    }, () => {
      this.props.setTabVisible()
    })
  }

  selectDevice (deviceId) {
    this.setState({
      selectedDeviceId: deviceId,
    })
    this.props.selectedDeviceId(deviceId)
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
    if (!parseInt(str, 10)) {
      return '00:00:00'
    }
    let secNum = parseInt(str, 10) // don't forget the second param
    let hours = Math.floor(secNum / 3600)
    let minutes = Math.floor((secNum - (hours * 3600)) / 60)
    let seconds = secNum - (hours * 3600) - (minutes * 60)

    if (hours < 10) { hours = '0' + hours }
    if (minutes < 10) { minutes = '0' + minutes }
    if (seconds < 10) { seconds = '0' + seconds }
    return hours + ':' + minutes + ':' + seconds
  }

  toApply00 (str) {
    if (!parseInt(str, 10)) {
      return '00'
    }
    let strResult = str
    if (str < 10) { strResult = '0' + str }
    return strResult
  }

  closeSolarModal = (goSolar) => {
	this.setState({
	  visibleSolarModal: false
    }, () => {
		if (goSolar)
		{
			this.postSolar(this.state.selectedDeviceId, true)
		}
	})
  }

  handleToggleEco = (deviceId, enabled) => {
	  if (enabled)
	  {
		  this.setState({
			  visibleSolarModal: true
		  })
	  } else {
		this.postSolar(deviceId, enabled)
	  }
  }
  
  postSolar = (deviceId, enabled) => {
	  postSetEcoMode(deviceId, enabled)
      .then((a) => {
      })
      .catch((err) => {
          console.log(err)
      })
  }

  postSchedule = (deviceId, enabled) => {
    const { selectedDeviceId } = this.state
    const selectedDevice = this.props.devicesHash[selectedDeviceId]
    let chargetimer = this.checkKeyExist('chargetimer', selectedDevice['variables']) ? JSON.parse(selectedDevice['variables']['chargetimer']) : false

    let hour = chargetimer ? chargetimer[0]['hour'] : '00'
    let min = chargetimer ? chargetimer[0]['min'] : '00'

	  postSetEnableSchedule(deviceId, `{chargetimer:[{hour:${hour}, min:${min}, dailyenable:${enabled}, active:false}]}`)
      .then((a) => {
      })
      .catch((err) => {
          console.log(err)
      })
  }

  render () {
    const { selectedDeviceId } = this.state

    if (this.props.deviceCount === 0) {
      return (
        <Container style={{backgroundColor: '#FFFFFF'}}>
          <PageHeader />
          <PageTop
            iconName='setting3'
            firstText=''
            secondText={'No Points'}
          />
          <Bar
            barText='Add Charge Point'
          />
          <BlueBtn style={{paddingLeft: 42, paddingRight: 42, paddingTop: 18, paddingBottom: 18}} onClick={()=>this.props.goAddPage()}>
            <Text style={[appStyles.blueBtnTextColor, {fontSize: 18}]}>Please Click Here To Add Charge Point</Text>
          </BlueBtn>
        </Container>
      )
    }

    if (!this.state.visibleTabBar || this.props.deviceCount === null) {
      return (
        <View style={{flex: 1, position: 'absolute', left: 0, top: 0, height: '100%', width: '100%'}}>
            <Image
              source={require('../../assets/images/splash.png')}
              style={{flex: 1, width: undefined, height: undefined}}
            >
            </Image>
          <Spinner style={{position: 'absolute', left: '50%', top: '50%', marginLeft: -25, marginTop: -25}} />
        </View>
      )
    }    

    const selectedDevice = this.props.devicesHash[selectedDeviceId]

    if( !selectedDevice || !this.checkKeyExist('variables', selectedDevice) || !selectedDevice['variables']) {
      return
    }

    // console.log('selectedDevice', selectedDevice)
    let initStates = {
      'status': {
        't1Text': 'Status',
        't2Text': 'Offline',
        'iconName': 'status5-disable',
        'iconSty': 'disableColor',
        't2Sty': 'disableColor',
        'hasSwitch': true,
      },
      'security': {
        't1Text': 'Security',
        't2Text': 'Unlocked',
        'iconName': 'security1-disable',
        'iconSty': 'disableColor',
        't2Sty': 'disableColor',
        'hasSwitch': true,
      },
      'charge': {
        't1Text': 'Last Charge / Timer',
        't2Text': '00:00:00',
        'iconName': 'status7-disable',
        'iconSty': 'disableColor',
        't2Sty': 'disableColor',
        'hasSwitch': false,
        'hasScheduleSwitch': true,
      },
      'cost': {
        't1Text': 'Last Charge Cost',
        't2Text': '£ 0.00',
        'iconName': 'cost2',
        'iconSty': 'disableColor',
        't2Sty': 'disableColor',
        'hasSwitch': false,
      },
      'power': {
        't1Text': 'Total Charge Power',
        't2Text': '0.00 kW',
        'iconName': 'power2',
        'iconSty': 'disableColor',
        't2Sty': 'disableColor',
        'hasSwitch': false,
      },
      'mainternance': {
        't1Text': 'Mainternance',
        't2Text': 'No Action',
        'iconName': 'maintenance1-disable',
        'iconSty': 'disableColor',
        't2Sty': 'disableColor',
        'hasSwitch': false,
      },
	  'gridpower': {
        't1Text': 'Grid Power',
        't2Text': '0.00 kW',
        'iconName': 'power2',
        'iconSty': 'disableColor',
        't2Sty': 'disableColor',
        'hasSwitch': false,
      },
      'solar': {
        't1Text': 'Solar Power',
        't2Text': '0.00 kW',
        'iconName': 'solar1-disable',
        'iconSty': 'disableColor',
        't2Sty': 'disableColor',
        'hasSwitch': false,
        'hasSolarSwitch': true,
      },
    }

    const online = this.checkKeyExist('online', selectedDevice['variables']) ? selectedDevice['variables']['online'] : undefined
    let consume = this.checkKeyExist('consume', selectedDevice['variables']) ? selectedDevice['variables']['consume'] : undefined
    consume = (consume === undefined) ? '0.00' : consume.toFixed(2)
    let evccpower = this.checkKeyExist('evccpower', selectedDevice['variables']) ? selectedDevice['variables']['evccpower'] : undefined
    evccpower = (evccpower === undefined) ? '0.00' : evccpower.toFixed(2)
    let totalcost = this.checkKeyExist('totalcost', selectedDevice['variables']) ? selectedDevice['variables']['totalcost'] : undefined
    totalcost = (totalcost === undefined) ? '0.00' : totalcost.toFixed(2)
    let costunit = this.checkKeyExist('costunit', selectedDevice['variables']) ? selectedDevice['variables']['costunit'] : undefined
    costunit = (costunit === undefined) ? '0.00' : costunit.toFixed(2)

	  let solarpower = this.checkKeyExist('solarpower', selectedDevice['variables']) ? selectedDevice['variables']['solarpower'] : undefined
    solarpower = (solarpower === undefined) ? '0.00' : solarpower.toFixed(2)
	  let gridpower = this.checkKeyExist('gridpower', selectedDevice['variables']) ? selectedDevice['variables']['gridpower'] : undefined
    gridpower = (gridpower === undefined) ? '0.00' : gridpower.toFixed(2)
	  let totalpower = this.checkKeyExist('totalpower', selectedDevice['variables']) ? selectedDevice['variables']['totalpower'] : undefined
    totalpower = (totalpower === undefined) ? '0.00' : totalpower.toFixed(2)
	  let solarmode = this.checkKeyExist('solarmode', selectedDevice['variables']) ? selectedDevice['variables']['solarmode'] : false

	  let ecomode = this.checkKeyExist('ecomode', selectedDevice['variables']) ? selectedDevice['variables']['ecomode'] : false

    const lasterror = this.checkKeyExist('lasterror', selectedDevice['variables']) ? selectedDevice['variables']['lasterror'] : 0

    let chargetimer = this.checkKeyExist('chargetimer', selectedDevice['variables']) ? JSON.parse(selectedDevice['variables']['chargetimer']) : false

    let dailyenable = chargetimer ? chargetimer[0]['dailyenable'] : false
    // console.log('dailyenable', dailyenable)
    let hour = chargetimer ? this.toApply00(chargetimer[0]['hour']) : '00'
    let min = chargetimer ? this.toApply00(chargetimer[0]['min']) : '00'

    let dis_char = ''

    if (solarmode)
    {
      initStates['gridpower']['t2Text'] = `${gridpower} kW`
          initStates['gridpower']['t2Sty'] = 'grayColor'
          initStates['gridpower']['iconName'] = 'power1'

      initStates['solar']['t2Text'] = `${solarpower} kW`
          initStates['solar']['t2Sty'] = 'grayColor'
          initStates['solar']['iconName'] = 'solar1'

      if (ecomode)
      {
        initStates['gridpower']['t2Sty'] = 'disableColor'
        initStates['gridpower']['iconName'] = 'power2'
      }
    }


    if (lasterror !== 0) {
      initStates['status']['t2Sty'] = 'redColor'
      initStates['status']['iconSty'] = 'redColor'
      initStates['status']['t2Text'] = 'No CP'

      initStates['charge']['t2Sty'] = 'grayColor'
      initStates['charge']['iconSty'] = 'grayColor'

      initStates['mainternance']['t2Sty'] = 'redColor'
      initStates['mainternance']['iconSty'] = 'redColor'
      initStates['mainternance']['t2Text'] = 'Error'

      initStates['status']['iconName'] = 'status6'
      initStates['charge']['iconName'] = 'status7'
      initStates['mainternance']['iconName'] = 'maintenance2'
      
      switch (lasterror) {
        case 1001:
          // default
          break
        case 1002:
          break
      }
    } else {
      initStates['mainternance']['t2Sty'] = 'grayColor'
      initStates['mainternance']['iconSty'] = 'grayColor'

      initStates['mainternance']['iconName'] = 'maintenance1'

      const enablecharger = this.checkKeyExist('enablecharger', selectedDevice['variables']) ? selectedDevice['variables']['enablecharger'] : false
      if (enablecharger) {
        initStates['security']['t2Text'] = 'Unlocked'
        initStates['security']['t2Sty'] = 'grayColor'
        initStates['security']['iconName'] = 'security1'
        initStates['security']['iconSty'] = 'grayColor'

        initStates['status']['t2Text'] = 'Unlocked'
        initStates['status']['t2Sty'] = 'blueColor'
        initStates['status']['iconName'] = 'security5'
      } else {
        initStates['security']['t2Text'] = 'Locked'
        initStates['security']['t2Sty'] = 'blueColor'
        initStates['security']['iconName'] = 'security4'
        initStates['security']['iconSty'] = 'blueColor'

        initStates['status']['t2Text'] = 'Locked'
        initStates['status']['t2Sty'] = 'grayColor'
        initStates['status']['iconName'] = 'security1'
      }

      const chargerstatus = this.checkKeyExist('chargerstatus', selectedDevice['variables']) ? selectedDevice['variables']['chargerstatus'] : ''
      const lastchargingtime = this.checkKeyExist('lastchargingtime', selectedDevice['variables']) ? selectedDevice['variables']['lastchargingtime'] : ''
      dis_char = this.catchCharFromChargerStatus(chargerstatus);
      switch (this.catchCharFromChargerStatus(chargerstatus)) {
        case '':
          initStates['status']['t2Text'] = 'Offline'
          initStates['status']['t2Sty'] = 'grayColor'
          initStates['status']['iconName'] = 'status5'
          initStates['status']['iconSty'] = 'grayColor'
          break
        case 'A':
          
          break
        case 'B':
          initStates['status']['t2Text'] = 'Connected'
          initStates['status']['t2Sty'] = 'orangeColor'
          initStates['status']['iconName'] = 'status1'
          initStates['status']['iconSty'] = 'orangeColor'
          break
        case 'C':
        case 'D':
          initStates['status']['t2Text'] = 'Charging'
          initStates['status']['t2Sty'] = 'greenColor'
          initStates['status']['iconName'] = 'status4'
          initStates['status']['iconSty'] = 'greenColor'

		  if (solarmode && ecomode)
		  {
		    initStates['gridpower']['t2Sty'] = 'disableColor'
			initStates['gridpower']['iconName'] = 'power2'
		  } else {
            initStates['gridpower']['t2Sty'] = 'greenColor'
			initStates['gridpower']['iconName'] = 'power3'
		  }
          initStates['solar']['t2Sty'] = 'greenColor'
		  initStates['solar']['iconName'] = 'power3'
          break
      }
      switch (this.catchCharFromChargerStatus(chargerstatus)) {
        case '':
        case 'A':
          if (dailyenable) {
            initStates['charge']['t1Text'] = 'Scheduled Charge'
            initStates['charge']['t2Text'] = `${hour}:${min}`
            initStates['charge']['t2Sty'] = 'grayColor'
            initStates['charge']['iconSty'] = 'grayColor'

            initStates['charge']['iconName'] = 'charge2'
            break;
          }
        case 'B':
          initStates['charge']['t1Text'] = 'Last Charge / Timer'
          initStates['charge']['t2Text'] = this.toHHMMSS(lastchargingtime) // to be
          initStates['charge']['t2Sty'] = 'grayColor'
          initStates['charge']['iconSty'] = 'grayColor'

          initStates['charge']['iconName'] = 'status7'
          break
        case 'C':
        case 'D':
          initStates['charge']['t1Text'] = 'Charger Time'
          initStates['charge']['t2Text'] = this.toHHMMSS(lastchargingtime) // to be
          initStates['charge']['t2Sty'] = 'greenColor'
          initStates['charge']['iconSty'] = 'grayColor'

          initStates['charge']['iconName'] = 'status7'
          break
      }
      switch (this.catchCharFromChargerStatus(chargerstatus)) {
        case '':
        case 'A':
        case 'B':
          initStates['cost']['t1Text'] = 'Last Charge Cost'
          initStates['cost']['t2Text'] = `£ ${totalcost}`
          initStates['cost']['t2Sty'] = 'grayColor'
          initStates['cost']['iconSty'] = 'grayColor'

          initStates['cost']['iconName'] = 'cost1'
          break
        case 'C':
        case 'D':
          initStates['cost']['t1Text'] = 'Charging Cost'
          // initStates['cost']['t2Text'] = `£ ${costunit}`
          initStates['cost']['t2Text'] = `£ ${totalcost}`
          initStates['cost']['t2Sty'] = 'greenColor'
          initStates['cost']['iconSty'] = 'grayColor'

          initStates['cost']['iconName'] = 'cost1'
          break
      }
      switch (this.catchCharFromChargerStatus(chargerstatus)) {
        case '':
        case 'A':
        case 'B':
          initStates['power']['t1Text'] = 'Power Used'
          initStates['power']['t2Text'] = `${consume} kWh`
          initStates['power']['t2Sty'] = 'grayColor'
          initStates['power']['iconSty'] = 'grayColor'

          initStates['power']['iconName'] = 'power1'
          break
        case 'C':
        case 'D':
          initStates['power']['t1Text'] = 'Charging Power'
          initStates['power']['t2Text'] = `${evccpower} kW`
          initStates['power']['t2Sty'] = 'greenColor'
          initStates['power']['iconSty'] = 'greenColor'

          initStates['power']['iconName'] = 'power1'
          break
      }

      if (!enablecharger) {
        initStates['status']['iconSty'] = 'disableColor'
        initStates['status']['t2Sty'] = 'redColor'

        initStates['status']['iconName'] = 'security6'
      }
    }

    const deviceArr = this.props.devices.map((item, i) => {
      if (i === 1) {
        // alert(this.checkKeyExist('location', item.variables) ? parseFloat(parseFloat(item.variables.location.latitude).toFixed(10)) : 0);
      }
      return {
        deviceId: item.id,
        deviceName: item.name,
        friendlyName: ('variables' in item) ? item.variables.friendlyName : '',
        // serialNumber: ('variables' in item) ? item.variables.serialNumber : '',
        serialNumber: 'ANDERSEN A1',
        location: {
          latitude: this.checkKeyExist('location', item.variables) ? parseFloat(parseFloat(item.variables.location.latitude).toFixed(10)) : 0,
          longitude: this.checkKeyExist('location', item.variables) ? parseFloat(parseFloat(item.variables.location.longitude).toFixed(10)) : 0,
          // latitudeDelta: this.checkKeyExist('location', item.variables) ? parseFloat(item.variables.location.latitudeDelta) : 0,
          // longitudeDelta: this.checkKeyExist('location', item.variables) ? parseFloat(item.variables.location.longitudeDelta) : 0,
          latitudeDelta: 0.6,
          longitudeDelta: 0.6,
        },
      }
    })

    let resultStates = null
    // console.log('this.props.internetConnection', this.props.internetConnection)

    if (this.props.internetConnection === false || online === false) {
      resultStates = {
        'status': {
          't1Text': 'Status',
          't2Text': (this.props.internetConnection === false) ? 'Network Offline' : 'Offline',
          'iconName': 'status5-disable',
          'iconSty': 'disableColor',
          't2Sty': 'disableColor',
          'hasSwitch': true,
        },
        'security': {
          't1Text': 'Security',
          't2Text': 'Unlocked',
          'iconName': 'security1-disable',
          'iconSty': 'disableColor',
          't2Sty': 'disableColor',
          'hasSwitch': true,
        },
        'charge': {
          't1Text': 'Last Charge / Timer',
          't2Text': '00:00:00',
          'iconName': 'status7-disable',
          'iconSty': 'disableColor',
          't2Sty': 'disableColor',
          'hasSwitch': false,
          'hasScheduleSwitch': true,
        },
        'cost': {
          't1Text': 'Last Charge Cost',
          't2Text': '£ 0.00',
          'iconName': 'cost2',
          'iconSty': 'disableColor',
          't2Sty': 'disableColor',
          'hasSwitch': false,
        },
        'power': {
          't1Text': 'Total Charge Power',
          't2Text': '0.00 kW',
          'iconName': 'power2',
          'iconSty': 'disableColor',
          't2Sty': 'disableColor',
          'hasSwitch': false,
        },
        'mainternance': {
          't1Text': 'Mainternance',
          't2Text': 'No Action',
          'iconName': 'maintenance1-disable',
          'iconSty': 'disableColor',
          't2Sty': 'disableColor',
          'hasSwitch': false,
        },
		    'gridpower': {
		      't1Text': 'Grid Power',
          't2Text': '0.00 kW',
          'iconName': 'power2',
          'iconSty': 'disableColor',
          't2Sty': 'disableColor',
          'hasSwitch': false,
        },
        'solar': {
          't1Text': 'Solar Power',
          't2Text': '0.00 kW',
          'iconName': 'solar1-disable',
          'iconSty': 'disableColor',
          't2Sty': 'disableColor',
          'hasSwitch': false,
          'hasSolarSwitch': true,
        },
      }
    } else {
      resultStates = Object.assign({}, initStates)
    }

    let displayKeyArray = [];
    if (['A', 'B', 'C'].indexOf(dis_char) !== -1) {
      displayKeyArray = ['status', 'charge', 'cost', 'power', 'mainternance']
    } else {
      displayKeyArray = ['status', 'charge', 'cost', 'power', 'mainternance']
    }
	
	if (solarmode)
	{
		displayKeyArray = ['status', 'charge', 'cost', 'power', 'gridpower', 'solar', 'mainternance']
	}

    // console.log('this.props', this.props.navigation)

    let isRefresh = 0
    if (this.checkKeyExist('params', this.props.navigation.state)) {
      if (this.props.navigation.state.params && this.checkKeyExist('isRefresh', this.props.navigation.state.params)) {
        isRefresh = this.props.navigation.state.params.isRefresh
      }
    }

    return (
      <Container style={pageStyles.homeWrapper}>
        <SolarModal visible={this.state.visibleSolarModal} closeSolarModal={(goSolar)=>this.closeSolarModal(goSolar)} />
        <View style={{height: 207}}>
          {
            (this.props.deviceCount !== null && deviceArr.length === this.props.deviceCount) ? (
              <MapWrapper
                selectDevice={(deviceId) => this.selectDevice(deviceId)}
                mapData={deviceArr}
                mapUpdated={this.props.mapUpdated}
                isRefresh={isRefresh}
              />) : (
              <Container style={{backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
                <Spinner />
              </Container>
            )
          }
        </View>
        <View style={{flex: 1, position: 'absolute', left: '50%', marginLeft: -65, top: 10}}>
          <Image
            style={{flex: 1, height: 40, width: 130}}
            source={require('../../assets/images/logo1.png')}
            resizeMode="contain"
          />
        </View>

        <ScrollView style={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
        { /*<View style={{flex: 1, paddingLeft: 10, paddingRight: 10}}>*/}
          {
            displayKeyArray.map((key, i) => {
              return (
                <ListItem
                  key={`listitem-${i}`}
                  iconName={resultStates[key]['iconName']}
                  hasSwitch={resultStates[key]['hasSwitch']}
                  hasSolarSwitch={resultStates[key]['hasSolarSwitch']}
                  hasScheduleSwitch={resultStates[key]['hasScheduleSwitch']}
                  iconSty={resultStates[key]['iconSty']}
                  t2Sty={resultStates[key]['t2Sty']}
                  t1Text={resultStates[key]['t1Text']}
                  t2Text={resultStates[key]['t2Text']}
                  isLast={ i === (displayKeyArray.length-1) }
                  setEnableCharging={this.props.setEnableCharging}
                  deviceId={this.state.selectedDeviceId}
                  ecomode={ecomode}
                  dailyenable={dailyenable}
                  isEnableSwitch={resultStates['status']['t2Text'] === 'Unlocked' || resultStates['status']['t2Text'] === 'Locked'}
                  setEnableEco={(deviceId, enabled)=>this.handleToggleEco(deviceId, enabled)}
                  postSchedule={(deviceId, enabled)=>this.postSchedule(deviceId, enabled)}
                  goChargeSchedule={()=>{this.props.navigation.navigate('ChargeSchedule')}}
                />)
            })
          }
        </ScrollView>
        {/*</View>*/}

      </Container>
    )
  }
}

// ios-unlock-outline
let pageStyles = StyleSheet.create({
  homeWrapper: {
    backgroundColor: '#FFFFFF',
  },
})

HomeContainer.propTypes = {
  devicesHash: PropTypes.object,
  devices: PropTypes.array,
  setEnableCharging: PropTypes.func,
  selectedDeviceId: PropTypes.func,
  token: PropTypes.string,
  internetConnection: PropTypes.any,
  deviceCount: PropTypes.any,
  goAddPage: PropTypes.func,
  setTabVisible: PropTypes.func,
  mapUpdated: PropTypes.any,
}

export default withRouter(connect(
  state => ({
    devicesHash: state.particle.devicesHash,
    devices: state.particle.devices,
    deviceCount: state.particle.deviceCount,
    token: state.auth.token,
    internetConnection: state.misc.internetConnection,
    mapUpdated: state.particle.mapUpdated,
  }),
  dispatch => bindActionCreators({setEnableCharging, selectedDeviceId}, dispatch)
)(HomeContainer))

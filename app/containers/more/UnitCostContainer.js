import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Container, Input } from 'native-base'
import {connect} from 'react-redux'

import styles from '../../styles'

import PageHeaderBack from '../../components/common/PageHeaderBack'
import Bar from '../../components/common/Bar'
import Border from '../../components/common/Border'

import {
  putDeviceChargeCost,
} from '../../services/particleService'

import config from '../../config/config'

class UnitCostContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      costUnit: '',
      key: Math.random(),
    }
  }

  componentDidMount() {
    const {devicesHash, selectedDeviceId} = this.props
    const selectedDevice = devicesHash[selectedDeviceId]

    let deviceCostUnit = parseFloat(config.COST_UNIT).toFixed(2)

    if (this.checkKeyExist('costunit', selectedDevice['variables'])) {
      deviceCostUnit = selectedDevice['variables']['costunit']
    }
    this.setState({
      costUnit: deviceCostUnit.toString()
    })
  }

  checkKeyExist = (key, object) => {
    return (key in object)
  }

  setCost = () => {
    if (this.state.costUnit.toString() !== '') {
        putDeviceChargeCost(this.props.selectedDeviceId, this.state.costUnit)
            .then((a) => {
            })
            .catch((err) => {
                console.log(err)
            })
    }
  }

  handleCostChange = (text) => {
    if (/^-?\d+\.?\d*$/.test(text)) {
      let costVal = text;
      let isRefresh = false
      if (text % 1 !== 0) {
        let res = text.split('.')
        if (res[1].length >= 3) {
          costVal = parseFloat(res[0].toString()) + parseFloat(res[1].toString().substr(0,2)) / 100
          isRefresh = true
        }
      }
      this.setState({
        costUnit: costVal.toString(),
        key: (isRefresh) ? Math.random() : this.state.key,
      }, ()=>{
          this.setCost()
      })
    } else {
      let costVal = parseFloat(text);
      if (isNaN(costVal)) {
          costVal = ''
      } else {
        costVal = costVal.toString()
      }
      this.setState({
        costUnit: costVal,
        key: Math.random(),
      }, ()=> {
        this.setCost()
      })
    }
  }
  render () {
    return (
      <Container style={pageStyles.moreWrapper}>
        <PageHeaderBack pageName='More' {...this.props}/>

        <Bar
          barText='Edit kWh Unit Cost'
        />

        <View style={{height: 50}} />

        <Border style={pageStyles.marginLeftRight16} />

        <View style={[pageStyles.currencyWrapper, pageStyles.paddingLeftRight49]} onClick={() => { }}>
          <View style={pageStyles.flexRowView}>
            <View style={{flex: 0.6}}>
              <Text style={[styles.txtColor2, pageStyles.currenctyText]}>Cost kWh</Text>
            </View>
            <View style={{flex: 0.4, alignItems: 'flex-end'}}>
              <Input
                style={[styles.txtColor2, pageStyles.appText, pageStyles.txtPaddingMargin]}
                autoFocus={true}
                autoCorrect={false}
                spellCheck={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={(text) => this.handleCostChange(text)}
                disableFullscreenUI={true}
                value={this.state.costUnit}
                key={this.state.key}
              />
            </View>
          </View>
        </View>

        <Border style={pageStyles.marginLeftRight16} />
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
  txtPaddingMargin: {
    marginLeft: 10,
    marginRight: 10,
    height: 40,
  },
})

export default connect(
  state => ({
    devicesHash: state.particle.devicesHash,
    selectedDeviceId: state.particle.selectedDeviceId,
  }),
  null,
)(UnitCostContainer)

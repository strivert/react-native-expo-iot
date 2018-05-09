import React, { Component } from 'react'

import {
  Container, Left, Body
} from 'native-base'
import { View, Text } from 'react-native'

import ChargeSettingContainer from '../../containers/adding_device/ChargeSettingContainer'
import PageHeaderBack from '../../components/common/PageHeaderBack'

class ChargeSetting extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <PageHeaderBack navigation={navigation} {...this.props} />
    )
  });

  render () {
    return (
      <ChargeSettingContainer {...this.props}/>
    )
  }
}
export default ChargeSetting

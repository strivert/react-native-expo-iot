import React, { Component } from 'react'

import {
  Container,
} from 'native-base'

import ChargeScheduleContainer from '../../containers/adding_device/ChargeScheduleContainer'
import PageHeaderBack from '../../components/common/PageHeaderBack'

class ChargeSchedule extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <PageHeaderBack navigation={navigation} {...this.props} />
    )
  });

  render () {
    return (
      <ChargeScheduleContainer {...this.props} />
    )
  }
}
export default ChargeSchedule

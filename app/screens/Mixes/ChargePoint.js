import React, { Component } from 'react'

import {
  Container, Header, Left, Button, Icon, Body, Title, Text, Right
} from 'native-base'

import ChargePointContainer from '../../containers/adding_device/ChargePointContainer'
import PageHeader from '../../components/common/PageHeader'

class ChargePoint extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <PageHeader />
    )
  });

  render () {
    return (
      <ChargePointContainer {...this.props} />
    )
  }
}
export default ChargePoint

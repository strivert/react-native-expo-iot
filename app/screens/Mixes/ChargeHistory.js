import React, { Component } from 'react'

import {
  Container, Header, Left, Button, Icon, Body, Title, Text, Right
} from 'native-base'

import ChargeHistoryContainer from '../../containers/home/ChargeHistoryContainer'
import PageHeader from '../../components/common/PageHeader'

class ChargeHistory extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <PageHeader />
    )
  });

  render () {
    return (
      <ChargeHistoryContainer {...this.props} />
    )
  }
}
export default ChargeHistory

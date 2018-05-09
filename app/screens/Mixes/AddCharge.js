import React, { Component } from 'react'

import {
  Container,
} from 'native-base'

import AddingDeviceContainer from '../../containers/adding_device/AddingDeviceContainer'
import PageHeaderBack from '../../components/common/PageHeaderBack'

class AddCharge extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <PageHeaderBack navigation={navigation} {...this.props} />
    )
  });

  render () {
    return (
      /*
        <AddingDeviceContainer refresh={this.props.navigation.state.params.isRefresh} />
      */
      <AddingDeviceContainer {...this.props} />
    )
  }
}
export default AddCharge

import React, { Component } from 'react'

import AddingDeviceContainer from '../../containers/adding_device/AddingDeviceContainer'
class Setting extends Component {
  render () {
    return (
      <AddingDeviceContainer refresh={this.props.navigation.state.params.isRefresh} />
    )
  }
}
export default Setting

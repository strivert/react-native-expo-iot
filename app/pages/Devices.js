import React, { Component } from 'react'
import Page from './Page'
import DevicesContainer from '../containers/devices'

class Device extends Component {
  render () {
    return (
      <Page>
        <DevicesContainer />
      </Page>
    )
  }
}

Device.propTypes = {

}

export default Device

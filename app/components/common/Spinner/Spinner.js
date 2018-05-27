import React, { Component } from 'react'
import { Image } from 'react-native'

class Spinner extends Component {
  render () {
    return (
      <Image
        style={[{...this.props.style}, {height: 50, width: 50}]}
        source={require('../../../assets/images/page_icons/spinner.gif')}
        resizeMode="contain"
      />
    )
  }
}

export default Spinner

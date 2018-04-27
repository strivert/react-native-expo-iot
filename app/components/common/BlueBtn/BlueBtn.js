import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

class BlueBtn extends Component {
  render () {
    return (
      <TouchableOpacity style={[styles.blueBtn, this.props.style]} onPress={this.props.onClick}>
        {this.props.children}
      </TouchableOpacity>
    )
  }
}

let styles = StyleSheet.create({
  blueBtn: {
  },
})

BlueBtn.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  style: PropTypes.any,
}

export default BlueBtn

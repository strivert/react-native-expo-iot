import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

class Border extends Component {
  render () {
    return (
      <View style={[styles.border, this.props.style]}>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  border: {
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#959595',
  },
})

Border.propTypes = {
  style: PropTypes.object,
}

export default Border

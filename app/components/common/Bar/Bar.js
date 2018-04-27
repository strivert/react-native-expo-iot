import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'

class Bar extends Component {
  render () {
    return (
      <View style={styles.BarWrapper}>
        <Text style={styles.barText}>{this.props.barText}</Text>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  BarWrapper: {
    height: 29,
    backgroundColor: '#F2F2F2',
  },
  barText: {
    color: '#373636',
    fontSize: 18,
    paddingLeft: 16,
    lineHeight: 29,
    fontFamily: 'Proxima_nova_light',
  },
})

Bar.propTypes = {
  barText: PropTypes.string,
}

export default Bar

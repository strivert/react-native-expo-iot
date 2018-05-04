import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'

class Bar2 extends Component {
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
    height: 41,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barText: {
    color: '#363636',
    fontSize: 20,
    lineHeight: 41,
    fontFamily: 'Proxima_nova_ltsemibold',
  },
})

Bar2.propTypes = {
  barText: PropTypes.string,
}

export default Bar2

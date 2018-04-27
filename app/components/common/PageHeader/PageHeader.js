import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'

class PageHeader extends Component {
  render () {
    return (
      <View style={styles.headerWrapper}>
        <View style={styles.imgWrapper}>
          <Image
            style={{height: 40, width: 130, marginTop: 10}}
            source={require('../../../assets/images/logo.png')}
            resizeMode="contain"
          />
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  headerWrapper: {
    height: 60,
    paddingLeft: 16,
    paddingRight: 16,
  },
  imgWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#959595',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
})

export default PageHeader

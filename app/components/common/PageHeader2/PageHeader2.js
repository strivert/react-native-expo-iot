import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'

class PageHeader2 extends Component {
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
  },
  imgWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

export default PageHeader2

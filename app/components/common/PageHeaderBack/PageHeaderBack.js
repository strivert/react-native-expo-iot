import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import PropTypes from 'prop-types'

import BlueBtn from '../BlueBtn'

class PageHeaderBack extends Component {
  render () {
    return (
      <View style={styles.headerWrapper}>
        <View style={styles.imgWrapper}>
          <BlueBtn
            style={{position: 'absolute', left: 0, top: 0, width: 50, height: 60, justifyContent: 'center'}}
            onClick={() => {
              // this.props.navigation.goBack()
              this.props.navigation.navigate(this.props.pageName)
            }}
          >
            <Image
              style={{height: 22, width: 13}}
              source={require('../../../assets/images/page_icons/back.png')}
              resizeMode="contain"
            />
          </BlueBtn>
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

PageHeaderBack.propTypes = {
  navigation: PropTypes.any,
  pageName: PropTypes.any,
}

let styles = StyleSheet.create({
  headerWrapper: {
    height: 60,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white',
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

export default PageHeaderBack

import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'
import styles from '../../../styles'

class PageTop extends Component {
  constructor (props) {
    super(props)
    this.icons = {
      'account3': require('../../../assets/images/page_icons/account3.png'),
      'setting3': require('../../../assets/images/page_icons/setting3.png'),
    }
  }
  render () {
    return (
      <View style={pageStyles.topWrapper}>
        <View style={pageStyles.leftTop}>
          <Image source={this.icons[this.props.iconName]} style={[pageStyles.iconStyle]} />
        </View>
        <View style={[pageStyles.rightTop]}>
          <Text style={[pageStyles.firstText, styles.txtColor]}>{this.props.firstText}</Text>
          <Text style={[pageStyles.secondText, styles.txtColor]}>{this.props.secondText}</Text>
        </View>
      </View>
    )
  }
}

let pageStyles = StyleSheet.create({
  topWrapper: {
    height: 56,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    marginBottom: 19,
    marginTop: 19,
  },
  leftTop: {
    width: 77,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightTop: {
    flex: 1,
    flexDirection: 'column',
  },
  firstText: {
    fontSize: 17,
    fontFamily: 'Proxima_nova_light',
    lineHeight: 21,
  },
  secondText: {
    fontSize: 32,
    fontFamily: 'Proxima_nova_light',
  },
  iconStyle: {
    width: 45,
    height: 45,
  },
})

PageTop.propTypes = {
  imageSource: PropTypes.object,
  firstText: PropTypes.string,
  secondText: PropTypes.string,
  iconName: PropTypes.string,
}

export default PageTop

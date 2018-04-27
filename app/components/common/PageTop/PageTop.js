import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Icon } from 'native-base'
import PropTypes from 'prop-types'
import styles from '../../../styles'

class PageTop extends Component {
  render () {
    return (
      <View style={pageStyles.topWrapper}>
        <View style={pageStyles.leftTop}>
          <Icon name={this.props.iconName} style={[pageStyles.iconStyle, styles.txtColor]} />
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
    marginTop: 8,
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
    fontSize: 50,
  },
})

PageTop.propTypes = {
  imageSource: PropTypes.object,
  firstText: PropTypes.string,
  secondText: PropTypes.string,
  iconName: PropTypes.string,
}

export default PageTop

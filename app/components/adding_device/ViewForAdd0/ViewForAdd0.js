import React, { Component } from 'react'
import { Container } from 'native-base'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import styles from '../../../styles'
import Bar2 from '../../common/Bar2'
import BlueBtn from '../../common/BlueBtn'
import Border from '../../common/Border'

class ViewForAdd1 extends Component {
  render () {
    return (
      <Container style={styles.bgColor}>
        <Bar2 barText="Before we start" />
        <View style={pageStyles.menuBar}>
          <BlueBtn onClick={this.props.onCancel}>
            <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Cancel</Text>
          </BlueBtn>
          <BlueBtn onClick={this.props.onContinue}>
            <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Continue</Text>
          </BlueBtn>
        </View>
        <View style={{flex: 1}}>
          <View style={[styles.flexCenter, {flex: 0.3}]}>
            <Text style={[styles.txtColor2, pageStyles.appText, pageStyles.txtPaddingMargin]}>We will now add your charge point to your Andersen account</Text>
          </View>
          <Border style={styles.marginLeftRight16} />
        </View>
      </Container>
    )
  }
}

let pageStyles = StyleSheet.create({
  menuBar: {
    flexDirection: 'row', padding: 20, justifyContent: 'space-between',
  },
  appText: {
    fontSize: 18,
  },
  txtPaddingMargin: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 20,
    marginBottom: 20,
  },
})

ViewForAdd1.propTypes = {
  onCancel: PropTypes.func,
  onContinue: PropTypes.func,
}

export default ViewForAdd1

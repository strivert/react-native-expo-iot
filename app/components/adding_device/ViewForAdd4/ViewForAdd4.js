import React, { Component } from 'react'
import { Container } from 'native-base'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import styles from '../../../styles'
import Bar2 from '../../common/Bar2'
import BlueBtn from '../../common/BlueBtn'
import Border from '../../common/Border'

class ViewForAdd4 extends Component {
  render () {
    return (
      <Container style={styles.bgColor}>
        <Bar2 barText="Connect to charge point" />
        <View style={pageStyles.menuBar}>
          <BlueBtn onClick={this.props.onCancel}>
            <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Cancel</Text>
          </BlueBtn>
          <BlueBtn onClick={this.props.onContinue}>
            <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Continue</Text>
          </BlueBtn>
        </View>
        <View>
          <Text style={[styles.txtColor2, pageStyles.appText, pageStyles.txtPaddingMargin]}>
            Now select Wi-Fi networks from your phones settings menu
          </Text>
          <Text style={[styles.txtColor2, pageStyles.appText, pageStyles.txtPaddingMargin, {marginBottom: 100, marginTop: 0}]}>
            Choose Wi-Fi network <Text style={{fontFamily: 'Proxima_nova_altbold'}}>Andersen-XXXX</Text>
          </Text>
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
    marginLeft: 50,
    marginRight: 50,
    marginTop: 40,
    marginBottom: 40,
  },
})

ViewForAdd4.propTypes = {
  onCancel: PropTypes.func,
  onContinue: PropTypes.func,
}

export default ViewForAdd4

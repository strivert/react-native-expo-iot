import React, { Component } from 'react'
import { Container, CheckBox } from 'native-base'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import styles from '../../../styles'
import Bar2 from '../../common/Bar2'
import BlueBtn from '../../common/BlueBtn'
import Border from '../../common/Border'

class ViewForAdd8 extends Component {
  render () {
    return (
      <Container style={styles.bgColor}>
        <Bar2 barText="Wi-Fi password" />
        <View style={pageStyles.menuBar}>
          <BlueBtn onClick={this.props.onCancel}>
            <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Cancel</Text>
          </BlueBtn>
          <BlueBtn onClick={this.props.onContinue}>
            <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Continue</Text>
          </BlueBtn>
        </View>

        <View>
          <View style={[pageStyles.txtPaddingMargin, {flexDirection: 'row'}]}>
            <Text style={[styles.txtColor2, pageStyles.appText]}>SSID: </Text>
            <Text style={[styles.txtColor2, pageStyles.appText, {fontFamily: 'Proxima_nova_altbold'}]}>Network 1</Text>
          </View>
          <Border style={styles.marginLeftRight16} />

          <Text style={[styles.txtColor2, pageStyles.appText, pageStyles.txtPaddingMargin]}>Password</Text>
          <Border style={styles.marginLeftRight16} />

          <View style={[pageStyles.txtPaddingMargin, {flexDirection: 'row'}]}>
            <CheckBox
              ref={ref => (this.showPasswordCheckbox = ref)}
              color="#666"
            />
            <Text style={[styles.txtColor2, pageStyles.appText, {marginLeft: 20}]}>Show Password</Text>
          </View>
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

ViewForAdd8.propTypes = {
  onCancel: PropTypes.func,
  onContinue: PropTypes.func,
}

export default ViewForAdd8

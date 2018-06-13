import React, { Component } from 'react'
import { Container } from 'native-base'
import { StyleSheet, Text, View, Image } from 'react-native'
import PropTypes from 'prop-types'

import styles from '../../../styles'
import Bar2 from '../../common/Bar2'
import BlueBtn from '../../common/BlueBtn'

class ViewForAdd4 extends Component {
  render () {
    return (
      <Container style={styles.bgColor}>
        <Bar2 barText="Connect to charge point" />
        <View style={pageStyles.menuBar}>
          <BlueBtn onClick={this.props.onCancel}>
            <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Cancel</Text>
          </BlueBtn>
        </View>
        <View>
          <View style={styles.flexCenter}>
            <View style={pageStyles.txtPaddingMargin}>
              <Text style={[styles.txtColor2, pageStyles.appText]}>
                Now select Wi-Fi networks from your phones settings menu
              </Text>
            </View>

            <View style={[pageStyles.txtPaddingMargin, {marginBottom: 100, marginTop: 0}]}>
              <Text style={[styles.txtColor2, pageStyles.appText]}>
                Choose Wi-Fi network <Text style={{fontFamily: 'Proxima_nova_altbold'}}>Andersen-XXXX</Text>
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 50}}>
            <Image source={require('../../../assets/images/page_icons/spinner.gif')} style={{width: 50, height: 50}} />
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

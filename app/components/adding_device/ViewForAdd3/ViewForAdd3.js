import React, { Component } from 'react'
import { Container } from 'native-base'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import styles from '../../../styles'
import Bar2 from '../../common/Bar2'
import BlueBtn from '../../common/BlueBtn'
import Border from '../../common/Border'

class ViewForAdd3 extends Component {
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
          <View style={[styles.flexCenter, pageStyles.txtPaddingMargin]}>
            <View>
              <Text style={[styles.txtColor2, pageStyles.appText]}>
                Press and hold the nework setup button for 3-6 secs The LED should now be flashing
              </Text>
            </View>
          </View>

          <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 50}}>
            <View style={{width: 50, height: 50, borderWidth: 0.5, borderColor: '#bcbcbc'}}>
              <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#208fd7', marginTop: 5, marginLeft: 5}}>
              </View>
            </View>
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
    marginLeft: 50,
    marginRight: 50,
    marginTop: 40,
    marginBottom: 40,
  },
})

ViewForAdd3.propTypes = {
  onCancel: PropTypes.func,
  onContinue: PropTypes.func,
}

export default ViewForAdd3

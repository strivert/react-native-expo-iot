import React, { Component } from 'react'
import { Container } from 'native-base'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import styles from '../../../styles'
import Bar2 from '../../common/Bar2'
import BlueBtn from '../../common/BlueBtn'
import Border from '../../common/Border'

class ViewForAdd11 extends Component {
  render () {
    return (
      <Container style={styles.bgColor}>
        <Bar2 barText="Setup failure" />
        <View style={{flex: 1}}>
          <View style={pageStyles.pageView}>
            <View>
              <Text style={[styles.txtColor2, pageStyles.appText, styles.textCenter]}>
                Network setup faiure.
              </Text>
              <Text style={[styles.txtColor2, pageStyles.appText, styles.textCenter]}>
                Please try the setup
              </Text>
              <Text style={[styles.txtColor2, pageStyles.appText, styles.textCenter]}>
                process again
              </Text>
            </View>
          </View>
          <Border style={styles.marginLeftRight16} />
          <View style={styles.flexCenter}>
            <BlueBtn onClick={() => this.props.addAgain()} style={{paddingTop: 40, paddingBottom: 40}}>
              <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Restart Add Charge Point Setup</Text>
            </BlueBtn>
          </View>
          <Border style={styles.marginLeftRight16} />
          <View style={{flex: 0.5, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
            <BlueBtn onClick={this.props.onCancel} style={{paddingTop: 40, paddingBottom: 40}}>
              <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Cancel</Text>
            </BlueBtn>
          </View>
        </View>
      </Container>
    )
  }
}

let pageStyles = StyleSheet.create({
  appText: {
    fontSize: 18,
  },
  pageView: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
})

ViewForAdd11.propTypes = {
  onCancel: PropTypes.func,
  onContinue: PropTypes.func,
  addAgain: PropTypes.func,
}

export default ViewForAdd11

import React, { Component } from 'react'
import { Container } from 'native-base'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import styles from '../../../styles'
import Bar2 from '../../common/Bar2'
import BlueBtn from '../../common/BlueBtn'
import Border from '../../common/Border'

class ViewForAdd10 extends Component {
  componentDidMount () {
    this.props.clearVerifyingConnectionInterval()
  }
  render () {
    return (
      <Container style={styles.bgColor}>
        <Bar2 barText="Setup successfull" />
        <View style={{flex: 1}}>
          <View style={pageStyles.pageView}>
            <View>
              <Text style={[styles.txtColor2, pageStyles.appText, styles.textCenter]}>
                Great news
              </Text>
              <Text style={[styles.txtColor2, pageStyles.appText, styles.textCenter]}>
                Your Andersen Konnect
              </Text>
              <Text style={[styles.txtColor2, pageStyles.appText, styles.textCenter]}>
                charge point setup is now
              </Text>
              <Text style={[styles.txtColor2, pageStyles.appText, styles.textCenter]}>
                complete
              </Text>
            </View>
          </View>
          <Border style={styles.marginLeftRight16} />
          <View style={styles.flexCenter}>
            <BlueBtn onClick={() => { this.props.goDashboard() }} style={{paddingTop: 40, paddingBottom: 40}}>
              <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Dashboard</Text>
            </BlueBtn>
          </View>
          <Border style={styles.marginLeftRight16} />
          <View style={{flex: 0.5, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
            <BlueBtn onClick={() => { this.props.addAgain() }} style={{paddingTop: 40, paddingBottom: 40}}>
              <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Add Another Charge Point</Text>
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

ViewForAdd10.propTypes = {
  onCancel: PropTypes.func,
  onContinue: PropTypes.func,
  goDashboard: PropTypes.any,
  addAgain: PropTypes.any,
  clearVerifyingConnectionInterval: PropTypes.any,
}

export default ViewForAdd10

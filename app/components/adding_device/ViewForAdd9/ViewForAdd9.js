import React, { Component } from 'react'
import { Container } from 'native-base'
import { StyleSheet, Text, View, Image } from 'react-native'
import PropTypes from 'prop-types'

import styles from '../../../styles'
import Bar2 from '../../common/Bar2'

class ViewForAdd9 extends Component {
  componentDidMount () {
    setTimeout(() => {
      this.props.onContinue()
    }, 2000)
  }
  render () {
    return (
      <Container style={styles.bgColor}>
        <Bar2 barText="Completing Wi-Fi setup" />
        <View>
          <View style={[styles.flexCenter, pageStyles.txtPaddingMargin]}>
            <Text style={[styles.txtColor2, pageStyles.appText]}>
              Finalisign Wi-Fi network setup.
            </Text>
            <Text style={[styles.txtColor2, pageStyles.appText]}>
              This might take up to 60 secs
            </Text>
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
    marginTop: 100,
    marginBottom: 70,
  },
})

ViewForAdd9.propTypes = {
  onCancel: PropTypes.func,
  onContinue: PropTypes.func,
}

export default ViewForAdd9

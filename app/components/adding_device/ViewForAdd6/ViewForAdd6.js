import React, { Component } from 'react'
import { Container } from 'native-base'
import { StyleSheet, Text, View, Image } from 'react-native'
import PropTypes from 'prop-types'

import styles from '../../../styles'
import Bar2 from '../../common/Bar2'

class ViewForAdd6 extends Component {
  componentDidMount () {
    if (this.props.hotspots) {
      this.props.onContinue()
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.hotspots) {
      this.props.onContinue()
    }
  }
  render () {
    return (
      <Container style={styles.bgColor}>
        <Bar2 barText="Scanning Wi-Fi networks" />
        <View>
          <View style={styles.flexCenter}>
            <Text style={[styles.txtColor2, pageStyles.appText, pageStyles.txtPaddingMargin]}>
              Scanning Wi-Fi local networks
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

ViewForAdd6.propTypes = {
  onCancel: PropTypes.func,
  onContinue: PropTypes.func,
  hotspots: PropTypes.any,
}

export default ViewForAdd6

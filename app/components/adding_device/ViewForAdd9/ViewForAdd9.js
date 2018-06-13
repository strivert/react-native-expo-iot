import React, { Component } from 'react'
import { Container } from 'native-base'
import { StyleSheet, Text, View, Image } from 'react-native'
import PropTypes from 'prop-types'

import styles from '../../../styles'
import Bar2 from '../../common/Bar2'

class ViewForAdd9 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOk: false,
    }
  }

  componentDidMount () {
    /*
    setTimeout(() => {
      this.props.onContinue()
    }, 2000)
    */
    const {selectedHotspot, password} = this.props
    if (!selectedHotspot || password === '') {
      return
    }
    this.props.configureAndConnectAp(
      selectedHotspot.ssid,
      password,
      selectedHotspot.sec,
      selectedHotspot.ch
    )
      .then(() => {
        // alert('connected')
        this.props.setConnectionInter(false)
        this.setState({
          isOk: true,
        })
      })
      .catch(() => {
        this.props.goFail()
      })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.isOk === false && this.state.isOk === true) {
      this.props.addDevice()
    }
  }

  render () {
    return (
      <Container style={styles.bgColor}>
        <Bar2 barText="Completing Wi-Fi setup" />
        <View>
          <View style={[styles.flexCenter, pageStyles.txtPaddingMargin]}>
            <Text style={[styles.txtColor2, pageStyles.appText]}>
              Finalising Wi-Fi network setup.
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
  selectedHotspot: PropTypes.any,
  password: PropTypes.any,
  configureAndConnectAp: PropTypes.any,
  setConnectionInter: PropTypes.any,
  deviceId: PropTypes.any,
  addDevice: PropTypes.any,
  goFail: PropTypes.any,
}

export default ViewForAdd9

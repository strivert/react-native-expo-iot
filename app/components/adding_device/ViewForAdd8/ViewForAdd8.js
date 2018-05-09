import React, { Component } from 'react'
import { Container, CheckBox, Input } from 'native-base'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import styles from '../../../styles'
import Bar2 from '../../common/Bar2'
import BlueBtn from '../../common/BlueBtn'
import Border from '../../common/Border'

class ViewForAdd8 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      passwordText: '',
      showPassword: false,
    }
  }

  handlePasswordChange (text) {
    this.setState({
      passwordText: text,
    }, () => {
      this.props.setPassword(this.state.passwordText)
    })
  }

  handleSubmitConnect () {
    if (this.state.passwordText !== '') {
      this.props.onContinue()
    }
  }

  render () {
    const {showPassword} = this.state
    const {selectedHotspot} = this.props
    return (
      <Container style={styles.bgColor}>
        <Bar2 barText="Wi-Fi password" />
        <View style={pageStyles.menuBar}>
          <BlueBtn onClick={this.props.onCancel}>
            <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Cancel</Text>
          </BlueBtn>
          <BlueBtn onClick={() => this.handleSubmitConnect()}>
            <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Continue</Text>
          </BlueBtn>
        </View>

        <View>
          <View style={styles.flexCenter}>
            <View style={{flexDirection: 'row', marginTop: 40, width: '100%', textAlign: 'left', marginBottom: 20}}>
              <Text style={[styles.txtColor2, pageStyles.appText, {marginLeft: 60}]}>SSID: </Text>
              <Text style={[styles.txtColor2, pageStyles.appText, {fontFamily: 'Proxima_nova_altbold', marginRight: 60}]}>{selectedHotspot.ssid}</Text>
            </View>
          </View>
          <Border style={styles.marginLeftRight16} />

          <View style={styles.flexCenter}>
            <View style={{width: '100%', height: 40, marginTop: 10, marginBottom: 10}}>
              <Input
                style={[styles.txtColor2, pageStyles.appText, pageStyles.txtPaddingMargin]}
                secureTextEntry={!showPassword}
                autoFocus={true}
                autoCorrect={false}
                spellCheck={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={(text) => this.handlePasswordChange(text)}
                disableFullscreenUI={true}
              />
            </View>
          </View>
          <Border style={styles.marginLeftRight16} />

          <View style={[{flexDirection: 'row', marginTop: 20}]}>
            <View style={{marginLeft: 60, alignItems: 'flex-start'}}>
              <CheckBox
                ref={ref => (this.showPasswordCheckbox = ref)}
                color="#666"
              />
            </View>
            <View style={{marginRight: 60}}>
              <Text style={[styles.txtColor2, pageStyles.appText, {marginLeft: 20}]}>Show Password</Text>
            </View>
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
    height: 40,
  },
})

ViewForAdd8.propTypes = {
  onCancel: PropTypes.func,
  onContinue: PropTypes.func,
  setPassword: PropTypes.any,
  selectedHotspot: PropTypes.any,
}

export default ViewForAdd8

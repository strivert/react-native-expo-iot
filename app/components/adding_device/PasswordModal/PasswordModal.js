import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Label,
  Form,
  Item,
  Input,
  Text,
  CheckBox,
  Body,
  ListItem,
  View,
  Spinner,
} from 'native-base'
import {TouchableWithoutFeedback} from 'react-native'
import ReactNativeButton from 'react-native-button'
import FadeModal from '../../common/FadeModal'
import styles from '../../../styles'

class PasswordModal extends Component {
  constructor (props) {
    super(props)

    this.handlePressShowPassword = this.handlePressShowPassword.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)

    this.state = {
      showPassword: false,
      password: '',
    }
  }

  handlePressShowPassword () {
    this.setState({
      showPassword: !this.state.showPassword,
    })
  }

  handlePasswordChange (text) {
    this.setState({
      password: text,
    })
  }

  render () {
    const {
      selectedHotspot,
      handleModalClose,
      handleSubmitConnect,
      attemptingConnection,
    } = this.props
    const {showPassword, password} = this.state
    const {handlePasswordChange, handlePressShowPassword} = this

    return (
      <FadeModal handleModalClose={handleModalClose} style={[styles.bgModalColor]}>
        {attemptingConnection && <Spinner />}
        {!attemptingConnection && <Form style={[styles.bgModalColor]}>
          <Text style={[styles.txtColor]}>SSID: {selectedHotspot.ssid}</Text>
          <View style={[{display: selectedHotspot.sec ? 'flex' : 'none'}, styles.bgModalColor]}>
            <Item stackedLabel style={{marginLeft: 0}}>
              <Label style={[styles.txtColor]}>Password:</Label>
              <Input
                style={[styles.textInput, styles.txtColor]}
                secureTextEntry={!showPassword}
                autoFocus={true}
                autoCorrect={false}
                spellCheck={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={handlePasswordChange}
                disableFullscreenUI={true}
              />
            </Item>
            <TouchableWithoutFeedback onPress={() => this.showPasswordCheckbox.props.onPress()} style={[styles.bgModalColor]}>
              <ListItem style={[{borderBottomWidth: 0, marginLeft: 0}, styles.bgModalColor]}>
                <CheckBox
                  ref={ref => (this.showPasswordCheckbox = ref)}
                  color="#666"
                  checked={showPassword}
                  onPress={handlePressShowPassword} />
                <Body>
                  <Text style={[styles.label, styles.txtColor]}>Show password</Text>
                </Body>
              </ListItem>
            </TouchableWithoutFeedback>
          </View>
          <ListItem style={[styles.modalButtons, styles.bgModalColor]}>
            <ReactNativeButton
              onPress={handleModalClose}
              style={[styles.modalButton, styles.txtColor]}
            >Cancel</ReactNativeButton>
            <ReactNativeButton
              disabled={!!(selectedHotspot.sec && password === '')}
              // style={styles.modalButton}
              style={styles.modalButtonDisabled}
              styleDisabled={styles.modalButtonDisabled}
              onPress={() => handleSubmitConnect(selectedHotspot, password)}
            >Connect</ReactNativeButton>
          </ListItem>
        </Form>}
      </FadeModal>
    )
  }
}

PasswordModal.propTypes = {
  selectedHotspot: PropTypes.object.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  handleSubmitConnect: PropTypes.func.isRequired,
  attemptingConnection: PropTypes.bool,
}

export default PasswordModal

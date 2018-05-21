import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  Input,
  Card,
  CardItem,
  View,
} from 'native-base'
import {Platform, AlertIOS} from 'react-native'
import ReactNativeButton from 'react-native-button'
import Modal from 'react-native-modal'
import { Col, Row, Grid } from 'react-native-easy-grid'
import styles from '../styles'
import variables from '../../native-base-theme/variables/platform'

class Dialog extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      text: props.defaultValue || '',
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (Platform.OS === 'ios' && !prevProps.isVisible && this.props.isVisible) {
      AlertIOS.prompt(
        this.props.title,
        null,
        text => this.props.onSubmit(text),
        'plain-text',
        this.props.defaultValue || ''
      )
      this.props.onClose()
    }
  }

  handleSubmit () {
    this.props.onSubmit(this.state.text)
  }

  handleChange (name, value) {
    this.setState({[name]: value})
  }

  render () {
    const {
      isVisible,
      onClose,
      defaultValue,
      title,
    } = this.props
    const {handleChange, handleSubmit} = this

    if (Platform.OS === 'ios') {
      return <View></View>
    }

    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
      >
        <Card style={{flex: 0}}>
          <CardItem header bordered>
            <Text>{title}</Text>
          </CardItem>
          <CardItem>
            <Input
              autoFocus={true}
              autoCorrect={false}
              spellCheck={false}
              onChangeText={value => handleChange('text', value)}
              disableFullscreenUI={true}
              keyboardType="default"
              defaultValue={defaultValue}
              onSubmitEditing={handleSubmit}
            />
          </CardItem>
          <CardItem cardBody style={{flex: 0}}>
            <Grid>
              <Row style={{borderTopWidth: variables.borderWidth, borderColor: variables.cardBorderColor, flex: 0}}>
                <Col style={{borderRightWidth: variables.borderWidth, borderColor: variables.cardBorderColor}}>
                  <ReactNativeButton
                    onPress={onClose}
                    containerStyle={styles.modalGridButton}>
                    <Text>Cancel</Text>
                  </ReactNativeButton>
                </Col>
                <Col>
                  <ReactNativeButton
                    onPress={handleSubmit}
                    containerStyle={styles.modalGridButton}>
                    <Text>Submit</Text>
                  </ReactNativeButton>
                </Col>
              </Row>
            </Grid>
          </CardItem>
        </Card>
      </Modal>
    )
  }
}

Dialog.propTypes = {
  title: PropTypes.string,
  isVisible: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  defaultValue: PropTypes.string,
}

export default Dialog

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Modal, TouchableWithoutFeedback, TouchableOpacity, View, ScrollView} from 'react-native'
import styles from '../../../styles'

class FadeModal extends Component {
  render () {
    const {noPad} = this.props
    return (
      <Modal
        onRequestClose={this.props.handleModalClose}
        animationType="fade"
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={this.props.handleModalClose}>
          <View style={styles.modalBackdrop}>
            <TouchableOpacity activeOpacity={1}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                keyboardShouldPersistTaps="always"
              >
                <View style={!noPad ? styles.modalView : {padding: 0}}>
                  {this.props.children}
                </View>
              </ScrollView>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

FadeModal.propTypes = {
  handleModalClose: PropTypes.func,
  children: PropTypes.any.isRequired,
  noPad: PropTypes.bool,
}

export default FadeModal

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  Spinner,
} from 'native-base'
import Modal from 'react-native-modal'

class Loading extends Component {
  render () {
    return (
      <Modal
        isVisible={true}
        animationInTiming={0.1}
        animationOutTiming={0.1}
        backdropTransitionInTiming={0.1}
        backdropTransitionOutTiming={0.1}
      >
        <Card style={{flex: 0}}>
          <Spinner />
        </Card>
      </Modal>
    )
  }
}

Loading.propTypes = {

}

export default Loading

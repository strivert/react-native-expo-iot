import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  Button,
  Text,
  Spinner,
  View,
  Content,
  Footer,
  FooterTab,
  Container,
  H1,
} from 'native-base'

import styles from '../../styles'

import ViewForAdd1 from '../../components/adding_device/ViewForAdd1'
import ViewForAdd2 from '../../components/adding_device/ViewForAdd2'
import ViewForAdd3 from '../../components/adding_device/ViewForAdd3'
import ViewForAdd4 from '../../components/adding_device/ViewForAdd4'
import ViewForAdd5 from '../../components/adding_device/ViewForAdd5'
import ViewForAdd6 from '../../components/adding_device/ViewForAdd6'
import ViewForAdd7 from '../../components/adding_device/ViewForAdd7'
import ViewForAdd8 from '../../components/adding_device/ViewForAdd8'
import ViewForAdd9 from '../../components/adding_device/ViewForAdd9'
import ViewForAdd10 from '../../components/adding_device/ViewForAdd10'

import PageHeader2 from '../../components/common/PageHeader2'

class AddingDeviceContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      viewState: 0,
    }
  }

  increaseViewState () {
    this.setState({
      viewState: (this.state.viewState + 1),
    })
  }

  onCancel () {
  }

  onContinue () {
    this.setState({
      viewState: (this.state.viewState + 1),
    })
  }

  render () {
    let ViewComponent = null
    switch (this.state.viewState) {
      case 0:
        ViewComponent = ViewForAdd1
        break
      case 1:
        ViewComponent = ViewForAdd2
        break
      case 2:
        ViewComponent = ViewForAdd3
        break
      case 3:
        ViewComponent = ViewForAdd4
        break
      case 4:
        ViewComponent = ViewForAdd5
        break
      case 5:
        ViewComponent = ViewForAdd6
        break
      case 6:
        ViewComponent = ViewForAdd7
        break
      case 7:
        ViewComponent = ViewForAdd8
        break
      case 8:
        ViewComponent = ViewForAdd9
        break
      case 9:
        ViewComponent = ViewForAdd10
        break
      default:
        ViewComponent = ViewForAdd1
    }

    return (
      <Container style={styles.bgColor}>
        <PageHeader2 />
        <ViewComponent
          onCancel={() => {
            this.onCancel()
          }}
          onContinue={() => {
            this.onContinue()
          }}
        />
      </Container>
    )
  }
}

AddingDeviceContainer.propTypes = {
}

export default connect(
  state => ({
  }),
  dispatch => bindActionCreators({
  }, dispatch)
)(AddingDeviceContainer)

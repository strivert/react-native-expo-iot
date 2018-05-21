import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Header as NativeHeader,
  Left,
  Body,
  Title,
  Button,
  Icon,
} from 'native-base'
import {withRouter} from 'react-router-native'

class Header extends Component {
  constructor (props) {
    super(props)
    this.getHeaderTitle = this.getHeaderTitle.bind(this)
  }

  getHeaderTitle () {
    let title = this.props.history.location.pathname.substr(1) || 'Home'
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()
  }

  render () {
    return (
      <NativeHeader>
        <Left>
          <Button transparent onPress={() => this.props.openDrawer()}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>{this.getHeaderTitle()}</Title>
        </Body>
      </NativeHeader>
    )
  }
}

Header.propTypes = {
  openDrawer: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(Header)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  Body,
  Container,
  Content,
  Header,
  List,
  ListItem,
  Text,
  Title,
  View,
} from 'native-base'
import {withRouter} from 'react-router-native'
import styles from '../styles'

class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.handlePressLink = this.handlePressLink.bind(this)
  }

  handlePressLink (url, requireLogin) {
    if (requireLogin && !this.props.token) {
      return
    }
    this.props.closeDrawer()
    this.props.history.push(url)
  }

  render () {
    const {token, email, socketConnected} = this.props

    return <Container sidebar>
      <Header>
        <Body>
          <Title>Andersen-ev</Title>
        </Body>
      </Header>
      <Content bounces={false}>
        <View sidebarEmail>
          {!email && <Text>Not logged in</Text>}
          {email && <Text>Logged in: {email}</Text>}
          {email && <Text>{socketConnected ? 'Connected' : 'Disconnected'}</Text>}
        </View>
        <List>
          {/* <ListItem onPress={() => this.handlePressLink('/home')}>
            <Text>Home</Text>
          </ListItem> */}
          <ListItem onPress={() => this.handlePressLink('/devices', true)}>
            <Text style={!token ? styles.disabledText : []}>Devices</Text>
          </ListItem>
          <ListItem onPress={() => this.handlePressLink('/account')}>
            <Text>Account</Text>
          </ListItem>
        </List>
      </Content>
    </Container>
  }
}

Sidebar.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  token: PropTypes.string,
  email: PropTypes.string,
  socketConnected: PropTypes.bool.isRequired,
}

export default withRouter(connect(
  state => ({
    token: state.auth.token,
    email: state.user.email,
    socketConnected: state.particle.socketConnected,
  }),
  dispatch => bindActionCreators({}, dispatch)
)(Sidebar))

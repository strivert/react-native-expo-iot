import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Content, H1, Button, Text} from 'native-base'
import {withRouter} from 'react-router-native'
import styles from '../../styles'

class Home extends Component {
  render () {
    const {token} = this.props

    return (
      <Content padder>
        <H1>Andersen-ev app</H1>
        <Button block onPress={() => { this.props.history.push('/account') }} style={styles.marginTop}>
          <Text>Account</Text>
        </Button>
        <Button disabled={!token} block onPress={() => { this.props.history.push('/devices') }} style={styles.marginTop}>
          <Text>Devices</Text>
        </Button>
      </Content>
    )
  }
}

Home.propTypes = {
  history: PropTypes.object.isRequired,
  token: PropTypes.string,
}

export default withRouter(connect(
  state => ({
    token: state.auth.token,
  }),
  dispatch => bindActionCreators({}, dispatch)
)(Home))

import React, { Component } from 'react'

import HomeContainer from '../../containers/home/HomeContainer'

import {withRouter} from 'react-router-native'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class Home extends Component {
  componentWillReceiveProps (nextProps) {
    if (!nextProps.token) {
      this.props.navigation.navigate('Account')
    }
  }

  render () {
    return (
      <HomeContainer
        goAddPage={()=>{
          this.props.navigation.navigate('AddCharge')
        }}
      />
    )
  }
}

Home.propTypes = {
  token: PropTypes.string,
  navigation: PropTypes.object,
}

export default withRouter(connect(
  state => ({
    token: state.auth.token,
  }),
  null
)(Home))

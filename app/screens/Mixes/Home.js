import React, { Component } from 'react'

import HomeContainer from '../../containers/home/HomeContainer'

import {withRouter} from 'react-router-native'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class Home extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarVisible: navigation.state.params && navigation.state.params.isTabBar ? true : false
    }
  }
  
  componentWillReceiveProps (nextProps) {
    if (!nextProps.token) {
      this.props.navigation.navigate('Account')
    }
  }

  setTabVisible = () => {
    this.props.navigation.setParams({
      isTabBar: true,
    });
  }

  render () {
    return (
      <HomeContainer
        goAddPage={()=>{
          this.props.navigation.navigate('AddCharge')
        }}
        setTabVisible={this.setTabVisible}
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

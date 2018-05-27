import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, WebView, StyleSheet, Text } from 'react-native'

import { Container, Spinner } from 'native-base'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-native'

import PageHeaderBack from '../../components/common/PageHeaderBack'
import Bar from '../../components/common/Bar'

import appStyles from '../../styles'

class TermsContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
    }
    this.termsPage = [
      'https://andersen-ev.com/terms-and-conditions/',
      'https://andersen-ev.com/privacy-statement/',
      'https://andersen-ev.com/privacy-policy/',
    ]
    this.termsPageName = [
      'Terms of Service',
      'Privacy Statement ',
      'Privacy Policy',
    ]

    setTimeout(() => {
      this.setState({
        loaded: true,
      })
    }, 2000)
  }

  render () {
    const pageId = this.props.navigation.getParam('pageId')
    const {internetConnection} = this.props

    /*
    let webHeight = {}
    if (this.state.loaded) {
      webHeight = {flex: 1}
    } else {
      webHeight = {height: 0}
    }
    */

    if (!internetConnection) {
      return (
        <Container style={pageStyles.accountWrapper}>
          <PageHeaderBack pageName='User' {...this.props}/>
          <Text style={[appStyles.txtColor, {fontSize: 23, textAlign: 'center', marginTop: 20}]}>Network Offline</Text>
        </Container>
      )
    }

    return (
      <Container style={pageStyles.accountWrapper}>
        <PageHeaderBack pageName='User' {...this.props}/>
        <Bar
          barText={this.termsPageName[pageId]}
        />

        <View style={{flex: 1}}>
          <WebView
            source={{uri: this.termsPage[pageId]}}
            // style={[webHeight]}
          />
          {
            /*
            !this.state.loaded &&
            <View style={{backgroundColor: 'white', alignItems: 'center', justifyContent: 'flex-start'}}>
              <Spinner />
            </View>
            */
          }
        </View>
      </Container>
    )
  }
}

let pageStyles = StyleSheet.create({
  accountWrapper: {
    backgroundColor: '#FFFFFF',
  },
})

TermsContainer.propTypes = {
  navigation: PropTypes.any,
  internetConnection: PropTypes.any,
}

export default withRouter(connect(
  state => ({
    internetConnection: state.misc.internetConnection,
  }),
  null,
)(TermsContainer))

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {WebView, Dimensions} from 'react-native'
import urlParse from 'url-parse'
import {stringify} from 'qs'
import {fetchToken} from '../../actions/azureActions'
import {fetchUser} from '../../actions/andersenActions'

class AdView extends Component {
  static navigationOptions={ // no-eslint
    header: null,
  }

  constructor (props) {
    super(props)

    this.handleADToken = this.handleADToken.bind(this)

    this.state = {
      policy: 'B2C_1_customer-sign-up-sign-in',
      gotCode: false,
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.token && nextProps.token) {
      this.props.navigation.navigate('Mixes')
    }
  }

  componentDidMount () {
    if (this.props.token) {
      return this.props.fetchUser().then(() => {
        this.props.navigation.navigate('Mixes')
      })
    }
  }

  handleADToken (event) {
    const {url} = event
    const parsedUrl = urlParse(url, true)
    const {query} = parsedUrl
    const {policy, gotCode} = this.state

    if (
      (!query.error_description && !query.code) || gotCode) {
      return
    }

    if (query.error_description && query.error_description.indexOf('The user has forgotten their password.') > -1) {
      return this.setState({
        policy: 'B2C_1_customer-password-reset',
      })
    }

    if (query.error_description && query.error_description.indexOf('The user has cancelled entering self-asserted information') > -1) {
      return this.setState({
        policy: 'B2C_1_customer-sign-up-sign-in',
      })
    }

    this.props.fetchToken(query.code, policy)
      .then(() => this.props.fetchUser())

    this.setState({gotCode: true})
  }

  render () {

    if (this.props.token) {
      return null;
    }

    const {handleADToken} = this
    const {policy} = this.state

    const source = `https://login.microsoftonline.com/andersenevcustomers.onmicrosoft.com/oauth2/v2.0/authorize?${stringify({
      p: policy,
      client_id: 'fa14c5b2-babb-47d9-9a1f-614d3cae66a3',
      redirect_uri: 'https://login.microsoftonline.com/tfp/oauth2/nativeclient',
      scope: 'email profile openid offline_access',
      response_mode: 'query',
      prompt: 'login',
      nonce: Date.now(),
      response_type: 'code',
    })}`

    // Fix visibility problem on Android webview
    const js = `document.getElementsByTagName('body')[0].style.height = '${Dimensions.get('window').height}px';
    document.getElementsByTagName('body')[0].style.backgroundColor = '#212121';`

    return (
      <WebView
        automaticallyAdjustContentInsets={false}
        style={[{
          flex: 1,
          alignSelf: 'stretch',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          backgroundColor: '#212121',
        }]}
        source={{uri: source}}
        javaScriptEnabled={true}
        domStorageEnabled={false}
        decelerationRate="normal"
        onNavigationStateChange={handleADToken}
        startInLoadingState={true}
        injectedJavaScript={js}
        scalesPageToFit={true}
        thirdPartyCookiesEnabled={false}
        bounces={false}
      />
    )
  }
}

AdView.propTypes = {
  fetchToken: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  token: PropTypes.string,
}

export default connect(
  state => ({
    token: state.auth.token,
  }),
  dispatch => bindActionCreators({fetchToken, fetchUser}, dispatch)
)(AdView)

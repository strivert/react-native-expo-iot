import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TermsContainer from '../../containers/user/TermsContainer'

class TermsWeb extends Component {
  render () {
    return (
      <TermsContainer {...this.props}/>
    )
  }
}

TermsWeb.propTypes = {
  navigation: PropTypes.object,
}

export default TermsWeb

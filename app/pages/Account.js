import React, { Component } from 'react'
import Page from './Page'
import AccountContainer from '../containers/account'

class Account extends Component {
  render () {
    return (
      <Page>
        <AccountContainer />
      </Page>
    )
  }
}

Account.propTypes = {

}

export default Account

import React, { Component } from 'react'

import AccountContainer from '../../containers/user/AccountContainer'

class User extends Component {
  render () {
    return (
      <AccountContainer {...this.props} />
    )
  }
}
export default User

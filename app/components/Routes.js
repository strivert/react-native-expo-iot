import React from 'react'
import { Switch, Route } from 'react-router-native'
// import Home from '../pages/Home'
import Account from '../pages/Account'
import Devices from '../pages/Devices'

const routes = () => {
  return (
    <Switch>
      <Route path="/account" component={Account} />
      <Route path="/devices" component={Devices} />
    </Switch>
  )
}

export default routes

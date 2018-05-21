import React, { Component } from 'react'
import Page from './Page'
import HomeContainer from '../containers/home'

class Home extends Component {
  render () {
    return (
      <Page>
        <HomeContainer />
      </Page>
    )
  }
}

Home.propTypes = {

}

export default Home

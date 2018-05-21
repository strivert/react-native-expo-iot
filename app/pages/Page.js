import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FadeIn from '../components/FadeIn'
import styles from '../styles'

class Page extends Component {
  render () {
    return (
      <FadeIn style={styles.flexGrow}>
        {this.props.children}
      </FadeIn>
    )
  }
}

Page.propTypes = {
  children: PropTypes.any,
}

export default Page

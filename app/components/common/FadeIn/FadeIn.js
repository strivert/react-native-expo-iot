import React, { Component } from 'react'
import {Animated} from 'react-native'
import PropTypes from 'prop-types'

class FadeIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fadeAnim: new Animated.Value(0),
    }
  }

  componentDidMount () {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 300,
      }
    ).start()
  }

  render () {
    const {children, style} = this.props
    const {fadeAnim} = this.state

    return (
      // <View style={style}>
      //   {children}
      // </View>
      <Animated.View style={[style, {opacity: fadeAnim}]}>
        {children}
      </Animated.View>
    )
  }
}

FadeIn.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.any,
}

export default FadeIn

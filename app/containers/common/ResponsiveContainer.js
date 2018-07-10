import React from 'react'
import { ScrollView, Dimensions } from 'react-native'
import { Container } from 'native-base'

const { width } = Dimensions.get('window')

const NewContainer = (props) => {
  if (width > 320) {
    return <Container style={props.style}>{props.children}</Container>
  } else {
    return <ScrollView style={props.style}>{props.children}</ScrollView>
  }
}

export default NewContainer

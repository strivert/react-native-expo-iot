import React, { Component } from "react";
import {
  Text,
  Container
} from "native-base";
import ReactNative from "react-native";

class HomeContainer extends Component {  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={{ backgroundColor: "white" }}>
        <Text>123</Text>
      </Container>
    );
  }
}

export default HomeContainer;

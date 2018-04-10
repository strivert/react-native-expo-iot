import React, { Component } from "react";
import {
  Text,
  Container
} from "native-base";
import ReactNative from "react-native";

class ChargeContainer extends Component {  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={{ backgroundColor: "white" }}>
        <Text>Charge</Text>
      </Container>
    );
  }
}

export default ChargeContainer;

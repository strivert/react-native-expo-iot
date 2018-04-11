import React, { Component } from "react";
import ReactNative from "react-native";
import { StyleSheet, View } from 'react-native'
import {
  Container
} from "native-base";
import ListItem from '../../components/home/ListItem';
import MapWrapper from '../../components/home/MapWrapper';

class HomeContainer extends Component {  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={styles.homeWrapper}>
        
        <View style={{height: 207}}>
          <MapWrapper
            mapData={[
              {
                latitude: 51.509865,
                longitude: -0.118092,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              },
              {
                latitude: 48.864716,
                longitude: 2.349014,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            ]}
          />
        </View>

        <View style={{flex: 1, paddingLeft: 10, paddingRight: 10,}}>
          <ListItem iconName='ios-close-circle-outline' hasSwitch={true} iconSty="redColor" t2Sty="grayColor" t2Text="Connected" />
          <ListItem iconName='ios-lock-outline' iconSty="purpleColor" t2Sty="blueColor" t2Text="Unlocked" />
          <ListItem iconName='ios-paper-outline' iconSty="orangeColor" t2Sty="yelloColor" t2Text="00:00:18" />
          <ListItem iconName='ios-construct-outline' isLast={true} iconSty="greenColor" t2Sty="redColor" t2Text="CheckNetwork" />
        </View>

      </Container>
    );
  }
}

//ios-unlock-outline


let styles = StyleSheet.create({
  homeWrapper: {
    backgroundColor: '#FFFFFF'
  }
})
export default HomeContainer

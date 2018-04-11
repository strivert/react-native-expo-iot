import React, { Component } from 'react'
import { Icon, Text, Switch } from 'native-base'
import { StyleSheet, View } from 'react-native'
import Swiper from 'react-native-swiper';
import { MapView } from 'expo';

class MapWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
       visibleSwiper: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
       this.setState({
         visibleSwiper: true
       });
    }, 0);
  }
 
 
  render () {    

    const maps = this.props.mapData.map((location, i)=>{
      return  (
        <MapView
          style={{ flex: 1 }}
          initialRegion={location}
          key={`map-${i}`}
        >
          <MapView.Marker
            coordinate={location}
          />
        </MapView>
       )
    })

    return (
      <View style={{flex: 1}}>
        {this.state.visibleSwiper && 
          <Swiper
            style={styles.wrapper}
            showsButtons={true}
            onIndexChanged={(index)=>{
            }}
            ref="snapView"
          >
            {maps}
          </Swiper>
        }
      </View>
    )
  }
}

let styles = StyleSheet.create({
  wrapper: {
  }
})

export default MapWrapper

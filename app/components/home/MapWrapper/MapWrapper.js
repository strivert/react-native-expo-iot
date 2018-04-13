import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Swiper from 'react-native-swiper'
import { MapView } from 'expo'
import PropTypes from 'prop-types'

class MapWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visibleSwiper: false,
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        visibleSwiper: true,
      })
    }, 10)
  }

  onIndexChanged (selectedIndex) {
    this.props.selectDevice(
      this.props.mapData[selectedIndex].deviceId
    )
  }

  render () {
    const {mapData} = this.props
    const maps = mapData.map((item, i) => {
      return (
        <MapView
          style={{ flex: 1, position: 'relative' }}
          initialRegion={item.location}
          key={`map-${i}`}
        >
          <MapView.Marker
            coordinate={item.location}
          />
          <View style={{flex: 1, position: 'absolute', left: 30, top: 10}}>
            <Text style={{fontSize: 37}}>{item.deviceName}</Text>
          </View>
        </MapView>
      )
    })

    return (
      <View style={{flex: 1}}>
        {this.state.visibleSwiper &&
          <Swiper
            style={styles.wrapper}
            showsButtons={true}
            onIndexChanged={(index) => {
              this.onIndexChanged(index)
            }}
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
  },
})

MapWrapper.propTypes = {
  mapData: PropTypes.array,
  selectDevice: PropTypes.func,
}

export default MapWrapper

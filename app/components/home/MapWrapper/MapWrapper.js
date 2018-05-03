import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import { MapView } from 'expo'
import PropTypes from 'prop-types'
import odiff from 'odiff'

class MapWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visibleSwiper: false,
    }
    this.onIndexChanged.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (!this.state.visibleSwiper) {
      return true
    }

    if (odiff.equal(this.props.mapData, nextProps.mapData)) {
      // console.log('false')
      return false
    } else {
      // console.log('this.props.mapData', this.props.mapData)
      // console.log('nextProps.mapData', nextProps.mapData)
      return true
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        visibleSwiper: true,
      })
    }, 100)
  }

  onIndexChanged (selectedIndex) {
    this.props.selectDevice(
      this.props.mapData[selectedIndex].deviceId
    )
  }

  render () {
    const {mapData} = this.props
    // console.log('mapData', mapData)
    const maps = mapData.map((item, i) => {
      return (
        <View key={`view-map-${i}`} style={{ flex: 1, position: 'relative' }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: item.location.latitude + 0.004,
              longitude: item.location.longitude - 0.015,
              latitudeDelta: item.location.latitudeDelta,
              longitudeDelta: item.location.longitudeDelta,
            }}
            key={`map-${i}`}
          >
            <MapView.Marker
              // coordinate={item.location}
              coordinate={{
                latitude: item.location.latitude,
                longitude: item.location.longitude,
              }}
            />

            <View style={{flex: 1, position: 'absolute', width: '100%', height: 207}}>
              <Image source={ require('../../../assets/images/gradient.png') } style={{width: '100%', height: '100%', resizeMode: 'stretch'}} />
            </View>

            <View style={{flex: 1, position: 'absolute', left: 40, top: 80}}>
              <Text style={{fontSize: 30, fontFamily: 'Proxima_nova_light'}}>{item.deviceName}</Text>
              <Text style={{fontSize: 14, marginTop: 5, fontFamily: 'Proxima_nova_ltsemibold'}}>{item.serialNumber}</Text>
            </View>
          </MapView>
          <View style={{flex: 1, position: 'absolute', width: '100%', height: 207, backgroundColor: 'transparent'}}>
          </View>
        </View>
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
            nextButton={<Text style={{color: '#707070', fontSize: 50}}>›</Text>}
            prevButton={<Text style={{color: '#707070', fontSize: 50}}>‹</Text>}
            activeDotColor={'#707070'}
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
    position: 'relative',
  },
})

MapWrapper.propTypes = {
  mapData: PropTypes.array,
  selectDevice: PropTypes.func,
}

export default MapWrapper

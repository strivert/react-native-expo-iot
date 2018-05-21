import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { MapView, Location, Permissions } from 'expo'
import {
  View,
} from 'native-base'

class EditLocation extends Component {
  constructor (props) {
    super(props)

    this.handleMapPress = this.handleMapPress.bind(this)
    this.handleMapReady = this.handleMapReady.bind(this)

    this.state = {
      hasLocationPermission: null,
      coords: null,
      isChanged: false,
      paddingTop: 0,
    }
  }

  componentDidMount () {
    this.props.onRef(this)
    if (this.props.coords) {
      return this.setState({coords: this.props.coords})
    }
    this.handleGetCurrentLocation()
  }

  handleGetCurrentLocation () {
    return Permissions.askAsync(Permissions.LOCATION)
      .then(response => this.setState({hasLocationPermission: response.status === 'granted'}))
      .then(() => Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      }))
      .then(location => {
        const coords = Object.assign(location.coords, {
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        })
        return this.setState({coords, isChanged: true})
      })
  }

  handleSave () {
    this.props.onSet(this.state.coords)
  }

  handleMapPress (coordinate) {
    const coords = Object.assign({}, this.state.coords, coordinate)
    this.setState({coords, isChanged: true})
  }

  handleMapReady () {
    this.setState({
      paddingTop: 1,
    })
  }

  render () {
    const {handleMapPress, handleMapReady} = this
    const {coords, paddingTop} = this.state

    return (
      <View style={{flex: 1}}>
        <View style={{flexGrow: 1, paddingTop: paddingTop}}>
          {coords && <MapView
            onMapReady={handleMapReady}
            style={{flex: 1}}
            region={coords}
            onRegionChangeComplete={handleMapPress}
            provider="google"
            showsUserLocation={true}
            showsMyLocationButton={true}
            rotateEnabled={false}
          >
            <MapView.Marker coordinate={coords} />
          </MapView>}
        </View>
      </View>
    )
  }
}

EditLocation.propTypes = {
  coords: PropTypes.object,
  onSet: PropTypes.func.isRequired,
  onRef: PropTypes.func,
}

export default connect(
  state => ({
  }),
  dispatch => bindActionCreators({}, dispatch)
)(EditLocation)

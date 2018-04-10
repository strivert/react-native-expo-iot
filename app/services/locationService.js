import {Location, Permissions} from 'expo'

module.exports = {
  getLocation,
}

function getLocation () {
  return Permissions.askAsync(Permissions.LOCATION)
    .then(response => {
      if (response.status !== 'granted') {
        return Promise.reject(new Error('Location permission not granted.'))
      }
      return Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      })
    })
    .then(location => {
      const coords = Object.assign(location.coords, {
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })
      return coords
    })
}

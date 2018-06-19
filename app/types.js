import keyMirror from 'keymirror'

module.exports = keyMirror({
  SET_DEFAULTS: null,
  SET_CONNECTION_STATUS: null,
  SET_CONNECTION_INTER: null,
  // particle
  LOGOUT: null,

  // socket
  RECEIVED_DEVICE_STATUS: null,
  SOCKET_CONNECTED: null,
  SOCKET_DISCONNECTED: null,
  SET_SELECTED_DEVICE_ID: null,

  // refresh swiper-mapview once udpated
  MAP_UPDATED: false,
})

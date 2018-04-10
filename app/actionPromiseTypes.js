import keyMirror from 'keymirror'

module.exports = keyMirror({
  // auth
  GET_TOKEN: null,
  POST_REFRESH_TOKEN: null,

  // user
  GET_USER: null,
  PUT_USER: null,

  // chip
  GET_DEVICE_ID: null,
  GET_HOTSPOTS: null,
  GET_PUBLIC_KEY: null,
  POST_CONFIGURE_AP: null,
  POST_CONNECT_AP: null,
  POST_SET_CLAIM_CODE: null,

  // particle
  POST_CREATE_CLAIM_CODE: null,
  GET_DEVICES: null,
  GET_DEVICE: null,
  POST_SET_ENABLE_CHARGING: null,
  PUT_RENAME_DEVICE: null,
  PUT_DEVICE_SERIAL_NUMBER: null,
  PUT_DEVICE_LOCATION: null,
})

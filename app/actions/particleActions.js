import {
  POST_CREATE_CLAIM_CODE,
  GET_DEVICES,
  // GET_DEVICE,
  POST_SET_ENABLE_CHARGING,
  PUT_RENAME_DEVICE,
  PUT_DEVICE_SERIAL_NUMBER,
  PUT_DEVICE_LOCATION,
  PUT_DEVICE_COUNT,
  PUT_UNLOCKED_EVENT,
} from '../actionPromiseTypes'

import {
  RECEIVED_DEVICE_STATUS,
  SOCKET_CONNECTED,
  SOCKET_DISCONNECTED,
  SET_SELECTED_DEVICE_ID,
  MAP_UPDATED,
} from '../types'

import {
  postCreateClaimCode,
  getDevices,
  // getDevice,
  postSetEnableCharging,
  putRenameDevice,
  putDeviceSerialNumber,
  putDeviceLocation,
} from '../services/particleService'

module.exports = {
  createClaimCode,
  fetchDevices,
  // fetchDevice,
  receivedDeviceStatus,
  socketConnected,
  socketDisconnected,
  setEnableCharging,
  renameDevice,
  setSerialNumber,
  setLocation,
  selectedDeviceId,
  receivedDeviceCount,
  putUnlockedEvent,
  setMapUpdated,
}

function createClaimCode () {
  return {
    type: POST_CREATE_CLAIM_CODE,
    payload: postCreateClaimCode(),
  }
}

function fetchDevices () {
  return {
    type: GET_DEVICES,
    payload: getDevices(),
  }
}

// function fetchDevice (deviceId) {
//   return {
//     type: GET_DEVICE,
//     payload: getDevice(deviceId),
//     meta: {
//       deviceId,
//     },
//   }
// }

function receivedDeviceStatus (data) {
  return {
    type: RECEIVED_DEVICE_STATUS,
    meta: {
      data,
    },
  }
}

function socketConnected () {
  return {
    type: SOCKET_CONNECTED,
  }
}

function socketDisconnected () {
  return {
    type: SOCKET_DISCONNECTED,
  }
}

function setEnableCharging (deviceId, enabled) {
  return {
    type: POST_SET_ENABLE_CHARGING,
    payload: postSetEnableCharging(deviceId, enabled),
    meta: {deviceId, enabled},
  }
}

function renameDevice (deviceId, name) {
  return {
    type: PUT_RENAME_DEVICE,
    payload: putRenameDevice(deviceId, name),
    meta: {deviceId, name},
  }
}

function setSerialNumber (deviceId, serialNumber) {
  return {
    type: PUT_DEVICE_SERIAL_NUMBER,
    payload: putDeviceSerialNumber(deviceId, serialNumber),
    meta: {deviceId, serialNumber},
  }
}

function setLocation (deviceId, location) {
  return {
    type: PUT_DEVICE_LOCATION,
    payload: putDeviceLocation(deviceId, location),
    meta: {deviceId, location},
  }
}

function selectedDeviceId (deviceId) {
  return {
    type: SET_SELECTED_DEVICE_ID,
    payload: deviceId,
  }
}

function receivedDeviceCount (data) {
  return {
    type: PUT_DEVICE_COUNT,
    payload: data,
  }
}

function putUnlockedEvent (data) {
  return {
    type: PUT_UNLOCKED_EVENT,
    payload: data,
  }
}

function setMapUpdated (data) {
  return {
    type: MAP_UPDATED,
    payload: data,
  }
}

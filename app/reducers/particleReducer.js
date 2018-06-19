import {
  POST_CREATE_CLAIM_CODE,
  GET_DEVICES,
  // GET_DEVICE,
  PUT_RENAME_DEVICE,
  PUT_DEVICE_COUNT,
  PUT_UNLOCKED_EVENT,
} from '../actionPromiseTypes'

import {
  SOCKET_CONNECTED,
  SOCKET_DISCONNECTED,
  RECEIVED_DEVICE_STATUS,
  LOGOUT,
  SET_SELECTED_DEVICE_ID,
  MAP_UPDATED,
} from '../types'

import {keyBy, merge, values, get} from 'lodash'
import {TEST_DEVICE} from 'react-native-dotenv'

const initialState = {
  claimCode: null,
  devices: null,
  devicesHash: {},
  creatingClaimCode: false,
  socketConnected: false,
  selectedDeviceId: null,
  deviceCount: null,
  unlockedEvent: null,
  mapUpdated: 1,
}

export default function data (state = initialState, action) {
  switch (action.type) {
    case `${POST_CREATE_CLAIM_CODE}_FULFILLED`:
      return {
        ...state,
        claimCode: action.payload.data.claim_code,
        creatingClaimCode: false,
      }
    case `${POST_CREATE_CLAIM_CODE}_PENDING`:
      return {
        ...state,
        creatingClaimCode: true,
      }
    case `${POST_CREATE_CLAIM_CODE}_REJECTED`:
      return {
        ...state,
        creatingClaimCode: false,
      }
    case `${GET_DEVICES}_FULFILLED`: {
      if (TEST_DEVICE === '1') {
        action.payload.data.push({
          id: 'api',
          name: 'test',
        })
      }
      const devices = action.payload.data.map(device => {
        const setupComplete = (
          get(device, 'variables.serialNumber') &&
          get(device, 'variables.location') &&
          device.name
        )

        return {
          id: device.id,
          name: device.name,
          connected: device.connected,
          status: device.status,
          setupComplete,
        }
      })

      const devicesHash = merge({}, state.devicesHash, keyBy(devices, 'id'))

      return {
        ...state,
        devices: values(devicesHash).sort((a, b) => a.name > b.name ? 1 : -1),
        devicesHash,
      }
    }
    // case `${GET_DEVICE}_FULFILLED`: {
    //   const devicesHash = cloneDeep(state.devicesHash)

    //   if (devicesHash[action.meta.deviceId].variables) {
    //     return state
    //   }

    //   devicesHash[action.meta.deviceId].variables = action.payload.data.variables

    //   return {
    //     ...state,
    //     devices: values(devicesHash).sort((a, b) => a.name > b.name ? 1 : -1),
    //     devicesHash,
    //   }
    // }
    case `${PUT_RENAME_DEVICE}_FULFILLED`: {
      return state
    }
    case SOCKET_CONNECTED:
      return {
        ...state,
        socketConnected: true,
      }
    case SOCKET_DISCONNECTED:
      return {
        ...state,
        socketConnected: false,
      }
    case RECEIVED_DEVICE_STATUS: {
      const devicesHash = merge({}, state.devicesHash, {
        [action.meta.data.device_id]: {
          id: action.meta.data.device_id,
          name: get(action, 'meta.data.data.name') || get(state, `devicesHash.${action.meta.data.device_id}.name`),
          variables: action.meta.data.data,
        },
      })

      const setupComplete = (
        devicesHash[action.meta.data.device_id].variables.serialNumber &&
        devicesHash[action.meta.data.device_id].variables.location &&
        devicesHash[action.meta.data.device_id].name
      )

      devicesHash[action.meta.data.device_id].setupComplete = setupComplete

      return {
        ...state,
        devices: values(devicesHash).sort((a, b) => a.name > b.name ? 1 : -1),
        devicesHash,
      }
    }
    case LOGOUT:
      return {
        ...state,
        claimCode: null,
        devices: null,
        devicesHash: {},
        deviceCount: null,
      }
    case SET_SELECTED_DEVICE_ID:
      return {
        ...state,
        selectedDeviceId: action.payload,
      }
    case PUT_DEVICE_COUNT:
      return {
        ...state,
        deviceCount: action.payload.devcount,
      }
    case PUT_UNLOCKED_EVENT:
      return {
        ...state,
        unlockedEvent: action.payload,
      }
    case MAP_UPDATED:
      return {
        ...state,
        mapUpdated: action.payload,
      }
    default:
      return state
  }
}

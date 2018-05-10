import {
  GET_DEVICE_ID,
  GET_HOTSPOTS,
  POST_CONNECT_AP,
} from '../actionPromiseTypes'

const initialState = {
  deviceId: null,
  deviceClaimed: null,
  hotspots: null,
  attemptingConnection: false,
  fetchingHotspots: false,
  connected: null,
}

export default function data (state = initialState, action) {
  switch (action.type) {
    case `${GET_DEVICE_ID}_REJECTED`:
		// alert('reject')
      return {
        ...state,
        deviceId: null,
        deviceClaimed: null,
        connected: false,
      }
    case `${GET_DEVICE_ID}_FULFILLED`:
		// alert('ok fulti')
      return {
        ...state,
        deviceId: action.payload.data.id,
        deviceClaimed: action.payload.data.c === '1',
        connected: true,
      }
    case `${GET_HOTSPOTS}_PENDING`:
      return {...state, fetchingHotspots: true}
    case `${GET_HOTSPOTS}_REJECTED`:
      return {...state, fetchingHotspots: false}
    case `${GET_HOTSPOTS}_FULFILLED`:
      return {
        ...state,
        fetchingHotspots: false,
        hotspots: action.payload.data.scans.sort((a, b) => a.rssi < b.rssi ? 1 : -1),
      }
    case `${POST_CONNECT_AP}_PENDING`:
      return {...state, attemptingConnection: true}
    case `${POST_CONNECT_AP}_REJECTED`:
      return {...state, attemptingConnection: false}
    case `${POST_CONNECT_AP}_FULFILLED`:
      return {...state, attemptingConnection: false}
    default:
      return state
  }
}

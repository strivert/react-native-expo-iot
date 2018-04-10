import {
  SET_CONNECTION_STATUS,
} from '../types'

const initialState = {
  connectionStatus: null,
  internetConnection: false,
}

export default function data (state = initialState, action) {
  switch (action.type) {
    case SET_CONNECTION_STATUS:
      return {
        ...state,
        connectionStatus: action.meta,
        internetConnection: action.meta.type !== 'none',
      }
    default:
      return state
  }
}

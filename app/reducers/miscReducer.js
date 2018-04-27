import {
  SET_CONNECTION_STATUS,
  SET_CONNECTION_INTER,
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
    case SET_CONNECTION_INTER:
      // console.log('action.data', action.data);
      return {
        ...state,
        internetConnection: action.data,
      }
    default:
      return state
  }
}

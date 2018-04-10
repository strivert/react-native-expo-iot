import {
  GET_TOKEN,
  POST_REFRESH_TOKEN,
} from '../actionPromiseTypes'

import {
  LOGOUT,
  SET_DEFAULTS,
} from '../types'

const initialState = {
  token: null,
  refreshToken: null,
  gettingToken: false,
}

export default function data (state = initialState, action) {
  switch (action.type) {
    case SET_DEFAULTS:
      return {
        ...state,
        token: action.meta.auth.token,
        refreshToken: action.meta.auth.refreshToken,
      }
    case `${GET_TOKEN}_PENDING`:
      return {
        ...state,
        gettingToken: true,
      }
    case `${GET_TOKEN}_REJECTED`:
      return {
        ...state,
        gettingToken: false,
      }
    case `${GET_TOKEN}_FULFILLED`:
      return {
        ...state,
        token: action.payload.data.id_token,
        refreshToken: action.payload.data.refresh_token,
        gettingToken: false,
      }
    case `${POST_REFRESH_TOKEN}_FULFILLED`:
      return {
        ...state,
        token: action.payload.data.id_token,
        refreshToken: action.payload.data.refresh_token,
      }
    case LOGOUT:
      return {
        ...state,
        token: null,
        refreshToken: null,
      }
    default:
      return state
  }
}

import {
  SET_DEFAULTS,
  SET_CONNECTION_STATUS,
} from '../types'

module.exports = {
  setDefaults,
  setConnectionStatus,
}

function setDefaults (defaultState) {
  return {
    type: SET_DEFAULTS,
    meta: defaultState,
  }
}

function setConnectionStatus (status) {
  return {
    type: SET_CONNECTION_STATUS,
    meta: status,
  }
}

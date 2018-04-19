import {
  SET_DEFAULTS,
  SET_CONNECTION_STATUS,
  SET_CONNECTION_INTER,
} from '../types'

module.exports = {
  setDefaults,
  setConnectionStatus,
  setConnectionInter,
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

function setConnectionInter (status) {
  return {
    type: SET_CONNECTION_INTER,
    data: status,
  }
}

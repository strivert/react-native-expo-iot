import {
  GET_TOKEN,
  POST_REFRESH_TOKEN,
} from '../actionPromiseTypes'

import {
  LOGOUT,
} from '../types'

import {getToken, postRefreshToken} from '../services/azureService'

module.exports = {
  fetchToken,
  useRefreshToken,
  logout,
}

function fetchToken (code) {
  return {
    type: GET_TOKEN,
    payload: getToken(code),
  }
}

function useRefreshToken (refreshToken) {
  return {
    type: POST_REFRESH_TOKEN,
    payload: postRefreshToken(refreshToken),
  }
}

function logout () {
  return {
    type: LOGOUT,
  }
}

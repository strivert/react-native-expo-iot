import RsaKey from '../services/RsaKey'
import {
  GET_DEVICE_ID,
  GET_HOTSPOTS,
  GET_PUBLIC_KEY,
  POST_CONFIGURE_AP,
  POST_CONNECT_AP,
  POST_SET_CLAIM_CODE,
} from '../actionPromiseTypes'

import {
  getId,
  getHotspots,
  getPublicKey,
  postConfigureAp,
  postConnectAp,
  postSetClaimCode,
} from '../services/chipService'

module.exports = {
  fetchId,
  fetchHotspots,
  fetchPublicKey,
  configureAp,
  connectAp,
  configureAndConnectAp,
  setClaimCode,
}

function fetchId () {
  return {
    type: GET_DEVICE_ID,
    payload: getId(),
  }
}

function fetchHotspots () {
  return {
    type: GET_HOTSPOTS,
    payload: getHotspots(),
  }
}

function fetchPublicKey () {
  return {
    type: GET_PUBLIC_KEY,
    payload: getPublicKey(),
  }
}

function configureAp (ssid, pwd, sec, ch) {
  return {
    type: POST_CONFIGURE_AP,
    payload: postConfigureAp(ssid, pwd, sec, ch),
  }
}

function connectAp () {
  return {
    type: POST_CONNECT_AP,
    payload: postConnectAp(),
  }
}

function setClaimCode (code) {
  return {
    type: POST_SET_CLAIM_CODE,
    payload: postSetClaimCode(code),
  }
}

function configureAndConnectAp (ssid, password, sec, ch) {
  return (dispatch, getState) => {
    const state = getState()

    return dispatch(fetchPublicKey())
      .then(data => {
        const publicKey = data.value.data.b
        const rsa = new RsaKey()
        rsa.setPublic(publicKey.substring(58, 58 + 256), publicKey.substring(318, 318 + 6))

        return rsa.encrypt(password)
      })
      .then(pwd => dispatch(configureAp(ssid, pwd, sec, ch)))
      .then(() => {
		alert('hello');
        dispatch(connectAp())
	   })
	  .catch((err) => {
        console.log('err', err)
      })
  }
}

import chipHttp from '../utils/chipHttp'
import {CancelToken} from 'axios'

module.exports = {
  getId,
  getHotspots,
  getPublicKey,
  postConfigureAp,
  postConnectAp,
  postSetClaimCode,
}

function getId () {
  let source = CancelToken.source()
  setTimeout(() => {
    source.cancel()
  }, 2000)
  // alert(source.token)
  return chipHttp.get('device-id', {cancelToken: source.token})
}

function getHotspots () {
  return chipHttp.get('scan-ap')
}

function getPublicKey () {
  return chipHttp.get('public-key')
}

function postConfigureAp (ssid, pwd, sec, ch) {
  return chipHttp.post('configure-ap', JSON.stringify({idx: 0, ssid, pwd, sec, ch}))
}

function postConnectAp () {
  return chipHttp.post('connect-ap', JSON.stringify({idx: 0}))
}

function postSetClaimCode (code) {
  return chipHttp.post('set', JSON.stringify({k: 'cc', v: code}))
}

import azureHttp from '../utils/azureHttp'
import {stringify} from 'qs'

module.exports = {
  getToken,
  postRefreshToken,
}

function getToken (code) {
  const url = 'token?' + stringify({
    p: 'B2C_1_customer-sign-up-sign-in',
    client_id: 'fa14c5b2-babb-47d9-9a1f-614d3cae66a3',
    grant_type: 'authorization_code',
    scope: 'email profile openid offline_access',
    code,
  })
  return azureHttp.post(url)
}

function postRefreshToken (token) {
  const url = 'token?' + stringify({
    p: 'B2C_1_customer-sign-up-sign-in',
  })
  return azureHttp.post(url, stringify({
    client_id: 'fa14c5b2-babb-47d9-9a1f-614d3cae66a3',
    refresh_token: token,
    grant_type: 'refresh_token',
  }))
}

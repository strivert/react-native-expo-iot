import axios from 'axios'
import {MOCK, ANDERSEN_IOT_DOMAIN} from 'react-native-dotenv'
import {useRefreshToken, logout} from '../actions/azureActions'
import store from '../store'

const http = axios.create({
  baseURL: `${ANDERSEN_IOT_DOMAIN}/api/`,
  timeout: 10000,
})

http.interceptors.request.use(request => {
  const state = store.getState()
  if (!state.auth.token) {
    delete request.headers['Authorization']
    return request
  }
  request.headers['Authorization'] = `Bearer ${state.auth.token}`
  return request
})

http.interceptors.response.use(undefined, err => {
  return new Promise(function (resolve, reject) {
    const state = store.getState()
    if ((err.response!== undefined && err.response.status === 401 && !state.auth.refreshToken) || err.config._retry) {
      return store.dispatch(logout)
    }

    if ((err.response!== undefined && err.response.status !== 401) || !err.config) {
      return reject(err)
    }

    err.config._retry = true

    return store.dispatch(useRefreshToken(state.auth.refreshToken))
      .then(() => {
        const state = store.getState()
        err.config.headers['Authorization'] = `Bearer ${state.auth.token}`
        return resolve(http(err.config))
      })
      .catch(err => {
        console.warn('refreshtoken failed', err)
        return reject(err)
      })
  })
})

if (MOCK === '1') {
  require('../mock')(http)
}

export default http

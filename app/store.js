import {AsyncStorage} from 'react-native'
import {createStore as reduxCreateStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import appReducer from './reducers/reducers'
import {get} from 'lodash'

const store = reduxCreateStore(appReducer, {}, applyMiddleware(thunkMiddleware, promiseMiddleware()))

let currentState

store.subscribe(() => {
  const state = store.getState()
  const multiSet = []
  const multiRemove = []
  const prevState = currentState

  if (state.user.email && get(prevState, 'user.email') !== state.user.email) {
    multiSet.push(['email', state.user.email])
  }

  if (!state.user.email) {
    multiRemove.push('email')
  }

  if (state.auth.token && get(prevState, 'auth.token') !== state.auth.token) {
    multiSet.push(['token', state.auth.token])
  }

  if (!state.auth.token) {
    multiRemove.push('token')
  }

  if (state.auth.refreshToken && get(prevState, 'auth.refreshToken') !== state.auth.refreshToken) {
    multiSet.push(['refreshToken', state.auth.refreshToken])
  }

  if (!state.auth.refreshToken) {
    multiRemove.push('refreshToken')
  }

  if (multiSet.length) {
    AsyncStorage.multiSet(multiSet)
  }

  if (multiRemove.length) {
    AsyncStorage.multiRemove(multiRemove)
  }

  currentState = state
})

export default store

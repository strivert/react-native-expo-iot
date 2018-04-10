import {combineReducers} from 'redux'
import chip from './chipReducer'
import particle from './particleReducer'
import auth from './authReducer'
import user from './userReducer'
import misc from './miscReducer'

export default combineReducers({
  chip,
  particle,
  auth,
  user,
  misc,
})

import {
  GET_USER,
} from '../actionPromiseTypes'

import {
  LOGOUT,
  SET_DEFAULTS,
} from '../types'

const initialState = {
  firstName: null,
  lastName: null,
  email: null,
  mobile: null,
  address1: null,
  address2: null,
  town: null,
  county: null,
  postcode: null,
  country: null,
  receivedUser: false,
  validAccount: false,
}

export default function data (state = initialState, action) {
  switch (action.type) {
    case SET_DEFAULTS:
      return {
        ...state,
        email: action.meta.user.email,
      }
    case `${GET_USER}_PENDING`: {
      return {
        ...state,
        receivedUser: false,
      }
    }
    case `${GET_USER}_FULFILLED`: {
      const {
        firstName,
        lastName,
        email,
        mobile,
        address1,
        address2,
        town,
        county,
        postcode,
        country,
      } = action.payload.data

      const validAccount = !!(firstName &&
      lastName &&
      email &&
      mobile &&
      address1 &&
      town &&
      county &&
      postcode)

      return {
        ...state,
        firstName,
        lastName,
        email,
        mobile,
        address1,
        address2,
        town,
        county,
        postcode,
        country,
        validAccount,
        receivedUser: true,
      }
    }
    case `${GET_USER}_REJECTED`: {
      return {
        ...state,
      }
    }
    case LOGOUT:
      return {
        ...state,
        firstName: null,
        lastName: null,
        email: null,
        address1: null,
        address2: null,
        town: null,
        county: null,
        postcode: null,
        country: null,
        receivedUser: false,
        validAccount: false,
      }
    default:
      return state
  }
}

import {
  GET_USER,
  PUT_USER,
} from '../actionPromiseTypes'

import {getUser, putUser} from '../services/andersenService'

module.exports = {
  fetchUser,
  updateUser,
}

function fetchUser () {
  return {
    type: GET_USER,
    payload: getUser(),
  }
}

function updateUser (firstName, lastName, mobile, address1, address2, town, county, postcode) {
  return {
    type: PUT_USER,
    payload: putUser(firstName, lastName, mobile, address1, address2, town, county, postcode),
  }
}

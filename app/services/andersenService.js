import andersenHttp from '../utils/andersenHttp'

module.exports = {
  getUser,
  putUser,
}

function getUser () {
  return andersenHttp.get('current-user')
}

function putUser (firstName, lastName, mobile, address1, address2, town, county, postcode) {
  return andersenHttp.put(
    'current-user',
    {firstName, lastName, mobile, address1, address2, town, county, postcode}
  )
}

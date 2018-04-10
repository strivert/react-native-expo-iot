import axios from 'axios'

const http = axios.create({
  baseURL: 'https://login.microsoftonline.com/andersenevcustomers.onmicrosoft.com/oauth2/v2.0/',
  timeout: 10000,
})

export default http

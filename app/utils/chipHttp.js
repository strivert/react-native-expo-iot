import axios from 'axios'
import {MOCK} from 'react-native-dotenv'

const http = axios.create({
  baseURL: 'http://192.168.0.1/',
  timeout: 10000,
})

if (MOCK === '1') {
  require('../mock')(http)
}

export default http

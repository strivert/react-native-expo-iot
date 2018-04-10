import MockAdapter from 'axios-mock-adapter'
import mockChip from './chip'

module.exports = http => {
  const mock = new MockAdapter(http, {delayResponse: 2000})

  mockChip(mock)
}

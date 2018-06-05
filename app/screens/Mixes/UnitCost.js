import React, { Component } from 'react'

import UnitCostContainer from '../../containers/more/UnitCostContainer'

class UnitCost extends Component {
  render () {
    return (
      <UnitCostContainer {...this.props} />
    )
  }
}
export default UnitCost

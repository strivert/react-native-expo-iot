import React, { Component } from 'react'
import { StyleSheet, View, Text, Modal } from 'react-native'

import BlueBtn from '../../common/BlueBtn'
import styles from '../../../styles'

import PropTypes from 'prop-types'

class MapWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visibleSwiper: false,
    }
  }

  render () {
    return (
      <Modal style={{}}>
        <View style={{height: 40, backgroundColor: '#f2f2f2'}}>
        </View>

        <View style={{padding: 30}}>
          <Text style={[pageStyles.cntText, styles.txtColor2]}>By enabling eco mode you will use only solar generated power to charge the vehicle. This may increase vehicle charge time.</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20}}>
          <BlueBtn style={[]} onClick={() => {}}>
            <Text style={[styles.blueBtnTextColor, pageStyles.cmdText]}>Cancel</Text>
          </BlueBtn>
          <BlueBtn style={[]} onClick={() => {}}>
            <Text style={[styles.blueBtnTextColor, pageStyles.cmdText]}>Continue</Text>
          </BlueBtn>
        </View>
      </Modal>
    )
  }
}

let pageStyles = StyleSheet.create({
  cmdText: {
    fontSize: 18,
  },
  cntText: {
    fontSize: 18,
  },
})

MapWrapper.propTypes = {
  mapData: PropTypes.array,
  selectDevice: PropTypes.func,
  isRefresh: PropTypes.any,
  mapUpdated: PropTypes.any,
}

export default MapWrapper

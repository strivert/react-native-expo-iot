import React, { Component } from 'react'
import { Container } from 'native-base'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import PropTypes from 'prop-types'

import styles from '../../../styles'
import Bar2 from '../../common/Bar2'

import BlueBtn from '../../common/BlueBtn'
import Border from '../../common/Border'

class ViewForAdd7 extends Component {
  render () {
    const networkArr = [
      { name: 'Network 1' },
      { name: 'Network 2' },
      { name: 'Network 3' },
      { name: 'Network 4' },
      { name: 'Network 5' },
    ]

    const netItems = networkArr.map((item, i) => {
      return (
        <View key={`networks-${i}`} >
          <View style={{flexDirection: 'row', paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 15, justifyContent: 'space-between'}}>
            <Text style={[styles.txtColor2, pageStyles.appText]}>{item.name}</Text>
            <Image source={require('../../../assets/images/page_icons/lock.png')} style={{width: 16, height: 22}} />
          </View>
          <Border style={styles.marginLeftRight16} />
        </View>
      )
    })

    return (
      <Container style={styles.bgColor}>
        <Bar2 barText="Select Wi-Fi network" />
        <View style={pageStyles.menuBar}>
          <BlueBtn onClick={this.props.onCancel}>
            <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Cancel</Text>
          </BlueBtn>
          <BlueBtn onClick={this.props.onContinue}>
            <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Continue</Text>
          </BlueBtn>
        </View>

        <ScrollView style={{flex: 1}}>
          {netItems}
        </ScrollView>

        <View style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
          <BlueBtn onClick={() => {}} style={{paddingTop: 40, paddingBottom: 40}}>
            <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Scan For More Networks</Text>
          </BlueBtn>
        </View>
      </Container>
    )
  }
}

let pageStyles = StyleSheet.create({
  menuBar: {
    flexDirection: 'row', padding: 20, justifyContent: 'space-between',
  },
  appText: {
    fontSize: 18,
  },
  txtPaddingMargin: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 40,
    marginBottom: 40,
  },
})

ViewForAdd7.propTypes = {
  onCancel: PropTypes.func,
  onContinue: PropTypes.func,
}

export default ViewForAdd7

import React, { Component } from 'react'
import { Icon, Text, Switch } from 'native-base'
import { StyleSheet, View } from 'react-native'

class ListItemWrapper extends Component {
  render () {
    const {iconName, iconSty, t1, t2Text, t2Sty, hasSwitch, isLast, switchSty } = this.props

    // item wrapper style
    let itemWrapperStyles = [styles.itemWrapper]
    isLast && itemWrapperStyles.push(styles.noBorder)

    // left icon style
    let iconStyles = [styles.iconStyle]
    iconSty && iconStyles.push(styles[iconSty])

    // body style
    let bodyStyles = [styles.bodyCtr]
    hasSwitch && bodyStyles.push(styles.flex_6)

    // first text style
    let t1Styles = [styles.t1]

    // second text style
    let t2Styles = [styles.t2]
    t2Sty && t2Styles.push(styles[t2Sty])

    // switch style
    let switchStyles = []
    switchSty && switchStyles.push(styles[switchSty])

    return (
      <View style={itemWrapperStyles}>
          <View style={styles.leftCtr}>
            <Icon name={iconName} style={iconStyles} />
          </View>
          <View style={bodyStyles}>
            <Text style={t1Styles}>Status</Text>
            <Text style={t2Styles}>{t2Text}</Text>
          </View>
          
          {
            hasSwitch &&
              <View style={styles.rightCtr}>
                <Switch value={false} style={switchStyles} />
              </View>
          }
      </View>
    )
  }
}

let styles = StyleSheet.create({
  itemWrapper: {
    flex: 1, flexDirection: 'row', borderColor:'#959595', borderWidth: 0, borderBottomWidth: 0.5, padding: 20, alignItems: 'center'
  },
  noBorder: {
    borderBottomWidth: 0
  },
  iconStyle: {
    fontSize: 35,
    color: '#707070'
  },  
  leftCtr: {
    flex: 0.2
  },
  rightCtr: {
    flex: 0.2
  },
  bodyCtr: {
    flexDirection: 'column', flex: 0.8
  },
  flex_6: {
    flex: 0.6
  },
  t1: {
    color: '#707070', fontSize: 17, lineHeight: 21
  },
  t2: {
    color: '#707070', fontSize: 32, lineHeight: 39
  },

  blueColor: {
    color: '#218FD8'
  },
  orangeColor: {
    color: '#F58533'
  },
  greenColor: {
    color: '#3FAF51'
  },
  purpleColor: {
    color: '#6C3D90'
  },  
  redColor: {
    color: '#E33535'
  },
  yellowColor: {
    color: '#FFC400'
  },
  grayColor: {
    color: '#E8E3E3'
  }
})

export default ListItemWrapper

import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Container } from 'native-base'

import styles from '../../styles'

import PageHeader from '../../components/common/PageHeader'
import PageTop from '../../components/common/PageTop'
import Bar from '../../components/common/Bar'
import BlueBtn from '../../components/common/BlueBtn'
import Border from '../../components/common/Border'

class MoreContainer extends Component {
  render () {
    return (
      <Container style={pageStyles.moreWrapper}>
        <PageHeader />
        <PageTop
          iconName='ios-settings-outline'
          firstText=''
          secondText='App Settings'
        />

        <Bar
          barText='Units'
        />

        <BlueBtn style={[pageStyles.currencyWrapper, pageStyles.paddingLeftRight49]} onClick={() => {}}>
          <View style={pageStyles.flexRowView}>
            <View style={{flex: 0.6}}>
              <Text style={[styles.txtColor2, pageStyles.currenctyText]}>Currency</Text>
            </View>
            <View style={{flex: 0.2, alignItems: 'center'}}>
              <Text style={[styles.txtColor2, pageStyles.percentText]}>%</Text>
            </View>
            <View style={{flex: 0.2, alignItems: 'flex-end'}}>
              <Text style={[styles.txtColor2, pageStyles.nextText]}>{'>'}</Text>
            </View>
          </View>
          <View style={{height: 17}}>
          </View>
        </BlueBtn>

        <Bar
          barText='App Support And Tutorial'
        />

        <BlueBtn style={[pageStyles.paddingLeftRight42, pageStyles.AppWrapper]} onClick={() => {}}>
          <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>App Support</Text>
        </BlueBtn>

        <Border style={pageStyles.marginLeftRight16} />

        <BlueBtn style={[pageStyles.paddingLeftRight42, pageStyles.AppWrapper]} onClick={() => {}}>
          <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>App Tutorial</Text>
        </BlueBtn>

        <Bar
          barText='About'
        />

        <View style={[pageStyles.paddingLeftRight42, pageStyles.AppWrapper]}>
          <View style={pageStyles.flexRowView}>
            <View style={{flex: 0.6}}>
              <Text style={[styles.txtColor2, pageStyles.appText]}>App Version</Text>
            </View>
            <View style={{flex: 0.4}}>
              <Text style={[styles.txtColor2, pageStyles.appText]}>4.3.4</Text>
            </View>
          </View>
          <View style={{height: 18}}>
          </View>
        </View>

        <Border style={pageStyles.marginLeftRight16} />

      </Container>
    )
  }
}

let pageStyles = StyleSheet.create({
  moreWrapper: {
    backgroundColor: '#FFFFFF',
  },
  paddingLeftRight49: {
    paddingLeft: 36,
    paddingRight: 36,
  },
  paddingLeftRight42: {
    paddingLeft: 42,
    paddingRight: 42,
  },
  marginLeftRight16: {
    marginLeft: 16,
    marginRight: 16,
  },
  currencyWrapper: {
    paddingTop: 17,
    paddingBottom: 17,
  },
  flexRowView: {
    flex: 1,
    flexDirection: 'row',
  },
  currenctyText: {
    fontSize: 18,
  },
  percentText: {
    fontSize: 18,
  },
  nextText: {
    fontSize: 18,
  },
  AppWrapper: {
    paddingTop: 18,
    paddingBottom: 18,
  },
  appText: {
    fontSize: 18,
  },
})

export default MoreContainer

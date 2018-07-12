import React, { Component } from 'react'
import { Button, Icon, Footer, FooterTab } from 'native-base'
import { StyleSheet, Image } from 'react-native'

class FooterWrapper extends Component {
  render () {
    return (
      <Footer style={styles.footerWrapper}>
        <FooterTab>
          <Button
            vertical
            active={this.props.navigationState.index === 0}
            onPress={() => this.props.navigation.navigate('HomeNav', { isRefresh: Date.now() })}>
            {
              (this.props.navigationState.index === 0 ?
                <Image source={require('../../../assets/images/bottom_icons/home2.png')} style={styles.footerIcon} />
                : <Image source={require('../../../assets/images/bottom_icons/home1.png')} style={styles.footerIcon} />
              )
            }
          </Button>
          <Button
            vertical
            active={this.props.navigationState.index === 1}
            onPress={() => this.props.navigation.navigate('User')}>
            {
              (this.props.navigationState.index === 1 ?
                <Image source={require('../../../assets/images/bottom_icons/account2.png')} style={styles.footerIcon} />
                : <Image source={require('../../../assets/images/bottom_icons/account1.png')} style={styles.footerIcon} />
              )
            }
          </Button>
          <Button
            vertical
            active={this.props.navigationState.index === 2}
            onPress={() => this.props.navigation.navigate('ChargePoint', { isRefresh: Date.now() })}>
            {
              (this.props.navigationState.index === 2 ?
                <Image source={require('../../../assets/images/bottom_icons/setting2.png')} style={styles.footerIcon} />
                : <Image source={require('../../../assets/images/bottom_icons/setting1.png')} style={styles.footerIcon} />
              )
            }
          </Button>
          <Button
            vertical
            active={this.props.navigationState.index === 3}
            onPress={() => this.props.navigation.navigate('More')}>
            {
              (this.props.navigationState.index === 3 ?
                <Image source={require('../../../assets/images/bottom_icons/more2.png')} style={styles.footerIcon} />
                : <Image source={require('../../../assets/images/bottom_icons/more1.png')} style={styles.footerIcon} />
              )
            }
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}

let styles = StyleSheet.create({
  footerWrapper: {
    borderWidth: 0.5, borderColor: '#959595', backgroundColor: '#F2F2F2',
  },
  footerIcon: {
    width: 25,
    height: 25,
  },
})

export default FooterWrapper

import React, { Component } from 'react'
import { Container, Button, Icon, Footer, FooterTab } from 'native-base'
import { StyleSheet } from 'react-native';

class FooterWrapper extends Component {
  render () {
    return (
      <Footer style={styles.footerWrapper}>
        <FooterTab>
          <Button
            vertical
            active={this.props.navigationState.index === 0}
            onPress={() => this.props.navigation.navigate('HomeNav')}>
            <Icon name='ios-home-outline' style={styles.footerIcon} />
          </Button>
          <Button
            vertical
            active={this.props.navigationState.index === 1}
            onPress={() => this.props.navigation.navigate('User')}>
            <Icon name='ios-person-outline' style={styles.footerIcon} />
          </Button>
          <Button
            vertical
            active={this.props.navigationState.index === 2}
            onPress={() => this.props.navigation.navigate('Setting', { isRefresh: Date.now() })}>
            <Icon name='ios-settings-outline' style={styles.footerIcon} />
          </Button>
          <Button
            vertical
            active={this.props.navigationState.index === 3}
            onPress={() => this.props.navigation.navigate('More')}>
            <Icon name='ios-list-outline' style={styles.footerIcon} />
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}

let styles = StyleSheet.create({
  footerWrapper: {
    borderWidth: 0.5, borderColor: '#959595'
  },
  footerIcon: {
    fontSize: 30
  }
});

export default FooterWrapper

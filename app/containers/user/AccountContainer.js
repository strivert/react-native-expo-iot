import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Container } from 'native-base'

import {withRouter} from 'react-router-native'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'

import {fetchUser} from '../../actions/andersenActions'
import {logout} from '../../actions/azureActions'

import styles from '../../styles'

import PageHeader from '../../components/common/PageHeader'
import PageTop from '../../components/common/PageTop'
import Bar from '../../components/common/Bar'
import BlueBtn from '../../components/common/BlueBtn'
import Border from '../../components/common/Border'

class AccountContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
    if (this.props.token) {
      this.props.fetchUser()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (!prevProps.token && this.props.token) {
      this.props.fetchUser()
    }
  }

  render () {
    const {email, user} = this.props
    return (
      <Container style={pageStyles.accountWrapper}>
        <PageHeader />
        <PageTop
          iconName='account3'
          firstText='AndersenId'
          secondText={`${user.firstName} ${user.lastName}`}
        />
        <Bar
          barText='Your Account'
        />
        <Text style={[styles.txtColor2, pageStyles.paddingLeftRight36, pageStyles.emailText]}>
          {email}
        </Text>

        <Border style={pageStyles.marginLeftRight16} />

        <BlueBtn style={[pageStyles.manageWrapper, pageStyles.paddingLeftRight36]} onClick={() => {}}>
          <Text style={[styles.blueBtnTextColor, pageStyles.manageText]}>Manage your Andersen ID</Text>
          <Text style={[styles.txtColor2, pageStyles.changeText]}>Change your password, delete account</Text>
        </BlueBtn>

        <Border style={pageStyles.width50} />

        <BlueBtn style={[pageStyles.paddingLeftRight36, pageStyles.termsWrapper]} onClick={() => {}}>
          <Text style={[styles.blueBtnTextColor, pageStyles.termsText]}>Terms and Conditions</Text>
        </BlueBtn>

        <Border style={pageStyles.marginLeftRight16} />

        <BlueBtn style={[pageStyles.paddingLeftRight36, pageStyles.signOutWrapper]} onClick={() => this.props.logout()}>
          <Text style={[styles.blueBtnTextColor, pageStyles.signOutText]}>Sign Out</Text>
        </BlueBtn>
      </Container>
    )
  }
}

let pageStyles = StyleSheet.create({
  accountWrapper: {
    backgroundColor: '#FFFFFF',
  },
  paddingLeftRight36: {
    paddingLeft: 36,
    paddingRight: 36,
  },
  marginLeftRight16: {
    marginLeft: 16,
    marginRight: 16,
  },
  width50: {
    width: '50%',
  },
  emailText: {
    marginTop: 17,
    marginBottom: 17,
    fontSize: 18,
  },
  manageWrapper: {
    paddingTop: 17,
    paddingBottom: 17,
  },
  manageText: {
    fontSize: 18,
    lineHeight: 23,
  },
  changeText: {
    fontSize: 17,
    lineHeight: 21,
    marginTop: 6,
  },
  termsWrapper: {
    paddingTop: 31,
    paddingBottom: 31,
  },
  termsText: {
    fontSize: 18,
  },
  signOutWrapper: {
    paddingTop: 25,
  },
  signOutText: {
    fontSize: 18,
  },
})

AccountContainer.propTypes = {
  user: PropTypes.object,
  email: PropTypes.string,
  token: PropTypes.string,
  fetchUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

export default withRouter(connect(
  state => ({
    user: state.user,
    token: state.auth.token,
    email: state.user.email,
  }),
  dispatch => bindActionCreators({fetchUser, logout}, dispatch)
)(AccountContainer))

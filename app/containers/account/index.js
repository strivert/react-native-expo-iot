import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  Text,
  Button,
  View,
  H2,
  Label,
  Footer,
  FooterTab,
  Spinner,
  Content,
} from 'native-base'
import {fetchUser, updateUser} from '../../actions/andersenActions'
import {logout} from '../../actions/azureActions'
import styles from '../../styles'
import AdView from './AdView'
import Details from './Details'

class Account extends Component {
  constructor (props) {
    super(props)

    this.handlePressLogout = this.handlePressLogout.bind(this)
    this.handlePressEdit = this.handlePressEdit.bind(this)
    this.handleCloseEdit = this.handleCloseEdit.bind(this)
    this.handleSave = this.handleSave.bind(this)

    this.state = {
      editModal: false,
      loading: false,
      submitted: false,
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

    if (!this.props.user.validAccount && this.props.user.receivedUser && !this.state.loading && !this.state.editModal) {
      this.setState({editModal: true})
    }

    if (this.props.user && this.props.user.receivedUser && !this.props.user.firstName) {

    }
  }

  handleSave (firstName, lastName, mobile, address1, address2, town, county, postcode) {
    this.setState({editModal: false, loading: true, submitted: true})
    this.props.updateUser(firstName, lastName, mobile, address1, address2, town, county, postcode)
      .then(() => this.props.fetchUser())
      .then(() => this.setState({loading: false}))
      .catch(() => this.setState({loading: false}))
  }

  handlePressLogout () {
    this.props.logout()
  }

  handlePressEdit () {
    this.setState({editModal: true})
  }

  handleCloseEdit () {
    this.setState({editModal: false})
  }

  handleChange (name, value) {
    this.setState({
      [name]: value,
    })
  }

  render () {
    const {token, gettingToken, email, user, internetConnection} = this.props
    const {editModal, loading, submitted} = this.state
    const {handlePressLogout, handlePressEdit, handleCloseEdit, handleSave} = this

    if (!token && !internetConnection) {
      return <View padder2>
        <Text>Internet connection not available.</Text>
      </View>
    }

    if (!token) {
      return <AdView />
    }

    if (editModal) {
      if (!user.receivedUser) {
        return <Spinner />
      }
      return <Details submitted={submitted} handleClose={handleCloseEdit} handleSave={handleSave} />
    }

    return (
      <View style={[styles.flex]}>
        <Content padder bounces={false}>
          {gettingToken && <Spinner />}
          {token && <View style={styles.pad}>
            <Text>Logged in: {email}</Text>
            {loading && <Spinner />}
            {user && !!user.receivedUser && <View userDetails>
              <H2>Your Details</H2>
              <Label>First name</Label>
              <Text boxText style={{borderWidth: 1}}>{user.firstName}</Text>
              <Label>Last name</Label>
              <Text boxText style={{borderWidth: 1}}>{user.lastName}</Text>
              <Label>Mobile</Label>
              <Text boxText style={{borderWidth: 1}}>{user.mobile}</Text>
              <Label>Address 1</Label>
              <Text boxText style={{borderWidth: 1}}>{user.address1}</Text>
              <Label>Address 2</Label>
              <Text boxText style={{borderWidth: 1}}>{user.address2}</Text>
              <Label>Town</Label>
              <Text boxText style={{borderWidth: 1}}>{user.town}</Text>
              <Label>County</Label>
              <Text boxText style={{borderWidth: 1}}>{user.county}</Text>
              <Label>Post code</Label>
              <Text boxText style={{borderWidth: 1}}>{user.postcode}</Text>
            </View>}
          </View>}
        </Content>
        <Footer>
          <FooterTab buttons>
            {token && user && !!user.receivedUser && <Button
              style={{marginRight: 5, borderRightWidth: 1, borderColor: '#000', borderRadius: 0}}
              onPress={handlePressEdit}>
              <Text>Edit</Text>
            </Button>}
            <Button
              onPress={handlePressLogout}>
              <Text>Sign out</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    )
  }
}

Account.propTypes = {
  token: PropTypes.string,
  email: PropTypes.string,
  fetchUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  gettingToken: PropTypes.bool,
  user: PropTypes.object,
  internetConnection: PropTypes.bool.isRequired,
}

export default connect(
  state => ({
    token: state.auth.token,
    email: state.user.email,
    user: state.user,
    gettingToken: state.auth.gettingToken,
    claimCode: state.particle.claimCode,
    internetConnection: state.misc.internetConnection,
  }),
  dispatch => bindActionCreators({fetchUser, updateUser, logout}, dispatch)
)(Account)

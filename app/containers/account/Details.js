import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Modal} from 'react-native'
import {
  Header,
  Left,
  Right,
  Text,
  Content,
  Button,
  Icon,
  Form,
  Label,
  Item,
  Input,
  Container,
  H2,
} from 'native-base'

class Details extends Component {
  constructor (props) {
    super(props)

    this.handlePressSave = this.handlePressSave.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      firstName: '',
      lastName: '',
      mobile: '',
      address: '',
      address2: '',
      town: '',
      county: '',
      postcode: '',
    }
  }

  componentDidMount () {
    const {firstName, lastName, email, mobile, address1, address2, town, county, postcode, country} = this.props.user

    this.setState({
      firstName,
      lastName,
      email,
      mobile,
      address1,
      address2,
      town,
      county,
      postcode,
      country,
    })
  }

  handlePressSave () {
    const {firstName, lastName, mobile, address1, address2, town, county, postcode} = this.state
    this.props.handleSave(firstName, lastName, mobile, address1, address2, town, county, postcode)
  }

  handleChange (name, value) {
    this.setState({
      [name]: value,
    })
  }

  render () {
    const {handleClose, submitted} = this.props
    const {
      firstName,
      lastName,
      mobile,
      address1,
      address2,
      town,
      county,
      postcode,
      saving,
    } = this.state
    const {handlePressSave, handleChange} = this

    return (
      <Modal onRequestClose={handleClose} animationType="slide">
        <Container>
          <Header>
            <Left>
              <Button hasText transparent onPress={handleClose}>
                <Icon name="arrow-back" />
                <Text>Cancel</Text>
              </Button>
            </Left>
            {/* <Body>
              <Title>Edit Account</Title>
            </Body> */}
            <Right>
              <Button hasText transparent disabled={saving} onPress={handlePressSave}>
                <Text>Save</Text>
              </Button>
            </Right>
          </Header>
          <Content padder2 keyboardShouldPersistTaps="always" bounces={false}>
            <H2>Edit Details</H2>
            <Form style={{marginBottom: 20}}>
              <Item regular error={submitted && !firstName}>
                <Label>First Name *</Label>
                <Input value={firstName} onChangeText={text => handleChange('firstName', text)} />
              </Item>
              <Item regular error={submitted && !lastName}>
                <Label>Last Name *</Label>
                <Input value={lastName} onChangeText={text => handleChange('lastName', text)} />
              </Item>
              <Item regular error={submitted && !mobile}>
                <Label>Mobile Number *</Label>
                <Input
                  value={mobile} onChangeText={text => handleChange('mobile', text)}
                  keyboardType="phone-pad"
                />
              </Item>
              <Item regular error={submitted && !address1}>
                <Label>Address 1 *</Label>
                <Input value={address1} onChangeText={text => handleChange('address1', text)} />
              </Item>
              <Item regular>
                <Label>Address 2</Label>
                <Input value={address2} onChangeText={text => handleChange('address2', text)} />
              </Item>
              <Item regular error={submitted && !town}>
                <Label>Town *</Label>
                <Input value={town} onChangeText={text => handleChange('town', text)} />
              </Item>
              <Item regular error={submitted && !county}>
                <Label>County *</Label>
                <Input value={county} onChangeText={text => handleChange('county', text)} />
              </Item>
              <Item regular error={submitted && !postcode}>
                <Label>Post Code *</Label>
                <Input value={postcode} onChangeText={text => handleChange('postcode', text)} autoCapitalize="characters" />
              </Item>
            </Form>
          </Content>
        </Container>
      </Modal>
    )
  }
}

Details.propTypes = {
  handleSave: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  submitted: PropTypes.bool,
}

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => bindActionCreators({}, dispatch)
)(Details)

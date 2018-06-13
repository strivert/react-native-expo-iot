import React, { Component } from 'react'
import { Container, Input } from 'native-base'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import styles from '../../../styles'
import Bar2 from '../../common/Bar2'
import BlueBtn from '../../common/BlueBtn'
import Border from '../../common/Border'

class ViewForAdd13 extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      nameField: '',
    }
  }

  handleChange (text) {
    this.setState({nameField: text})
  }

  render () {
    const {handleChange} = this

    return (
      <Container style={styles.bgColor}>
        <Bar2 barText="Add charge point name" />
        <View style={pageStyles.menuBar}>
          <BlueBtn onClick={this.props.onCancel}>
            <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Cancel</Text>
          </BlueBtn>
          <BlueBtn onClick={() => this.props.onSaveName(this.state.nameField)}>
            <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Continue</Text>
          </BlueBtn>
        </View>

        <View>
          <View style={styles.flexCenter}>
            <View style={{flexDirection: 'row', marginTop: 40, width: '100%', marginBottom: 20}}>
              <Text style={[styles.txtColor2, pageStyles.appText, {marginLeft: 60}]}>Name your charge point</Text>
            </View>
          </View>
          <Border style={styles.marginLeftRight16} />

          <View style={styles.flexCenter}>
            <View style={{width: '100%', height: 40, marginTop: 10, marginBottom: 10}}>
              <Input
                style={[styles.txtColor2, pageStyles.appText, pageStyles.txtPaddingMargin]}
                autoFocus={true}
                autoCorrect={false}
                spellCheck={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={handleChange}
                disableFullscreenUI={true}
              />
            </View>
          </View>
        </View>
        <Border style={styles.marginLeftRight16} />
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
    marginLeft: 60,
    marginRight: 60,
    height: 40,
  },
})

ViewForAdd13.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSaveName: PropTypes.func,
}

export default ViewForAdd13

import React, { Component } from 'react'
import { Container, CheckBox, Input } from 'native-base'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import styles from '../../../styles'
import Bar2 from '../../common/Bar2'
import BlueBtn from '../../common/BlueBtn'
import Border from '../../common/Border'

class ViewForAdd14 extends Component {
  constructor (props) {
    super(props)

    this.handleToggleSaveLocation = this.handleToggleSaveLocation.bind(this)

    this.state = {
      codeText: '',
      saveLocation: true,
    }
  }

  handleToggleSaveLocation () {
    this.setState({saveLocation: !this.state.saveLocation})
  }
  
  handleContinue = () => {
    if (this.state.codeText !== '') {
      this.props.onBarCodeRead({data: this.state.codeText}, this.state.saveLocation)
    }
  }

  handleCodeChange (text) {
    this.setState({
      codeText: text,
    })
  }

  render () {
    const {saveLocation} = this.state
    const {handleToggleSaveLocation} = this
    return (
      <Container style={styles.bgColor}>
        <Bar2 barText="Type QR Serial Code" />
        <View style={pageStyles.menuBar}>
          <BlueBtn onClick={()=>this.props.onCancel}>
            <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Cancel</Text>
          </BlueBtn>
          <BlueBtn onClick={() => this.handleContinue()}>
            <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Continue</Text>
          </BlueBtn>
        </View>

        <View>
          <View style={styles.flexCenter}>
            <View style={{flexDirection: 'row', marginTop: 40, width: '100%', textAlign: 'left', marginBottom: 20}}>
              <Text style={[styles.txtColor2, pageStyles.appText, {marginLeft: 60}]}>Type in QR Serial Number</Text>
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
                onChangeText={(text) => this.handleCodeChange(text)}
                disableFullscreenUI={true}
                placeholder="QR Code"
                placeholderTextColor={'#E8E3E3'}
              />
            </View>
          </View>
          <Border style={styles.marginLeftRight16} />

          <View style={{flexBasis: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <CheckBox checked={saveLocation} style={{marginRight: 20}} onPress={handleToggleSaveLocation} />
            <Text style={[styles.txtColor2, pageStyles.appText]}>Use phone location</Text>
          </View>
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
    marginLeft: 60,
    marginRight: 60,
    height: 40,
  },
})

ViewForAdd14.propTypes = {
  onCancel: PropTypes.func,
  onContinue: PropTypes.func,
}

export default ViewForAdd14

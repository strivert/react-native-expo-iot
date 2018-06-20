import React, { Component } from 'react'
import { Container, CheckBox } from 'native-base'
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import PropTypes from 'prop-types'
import { BarCodeScanner, Permissions, Svg } from 'expo'

import styles from '../../../styles'
import Bar2 from '../../common/Bar2'
import Spinner from '../../common/Spinner'
import BlueBtn from '../../common/BlueBtn'


class ViewForAdd12 extends Component {
  constructor (props) {
    super(props)

    this.handleBarcodeRead = this.handleBarcodeRead.bind(this)
    this.handleToggleSaveLocation = this.handleToggleSaveLocation.bind(this)

    this.state = {
      hasCameraPermission: null,
      saveLocation: true,
    }
  }

  componentDidMount() {
    this.props.setMapUpdated()
  }

  componentWillMount () {
    Permissions.askAsync(Permissions.CAMERA)
      .then(response => this.setState({hasCameraPermission: response.status === 'granted'}))
  }

  handleToggleSaveLocation () {
    this.setState({saveLocation: !this.state.saveLocation})
  }

  handleBarcodeRead (code) {
    this.props.onBarCodeRead(code, this.state.saveLocation)
  }

  render () {
    const {hasCameraPermission, saveLocation} = this.state
    const {handleToggleSaveLocation, handleBarcodeRead} = this
    const {width, height} = Dimensions.get('window')
    const svgSize = width < height - 340 ? width : height - 340
    const { saving } = this.props

    if (hasCameraPermission === null) {
      return <View></View>
    }

    if (hasCameraPermission !== true) {
      return <View padder>
        <Text>No access to camera</Text>
      </View>
    }

    if (saving === true) {
      return (
        <Container style={{backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
          <Spinner />
        </Container>
      )
    }

    return (
      <Container style={styles.bgColor}>
        <Bar2 barText="Scan QR Code" />
        <View style={{margin: 20, marginLeft: 50, marginRight: 50, marginBottom: 10}}>
          <Text style={[styles.txtColor2, pageStyles.appText, styles.textCenter]}>
            Now scan the QR code on the chargepoint
          </Text>
        </View>
        <View style={{flex: 1, position: 'relative'}}>
          <View style={{flexGrow: 1}}>
            <BarCodeScanner
              onBarCodeRead={this.handleBarcodeRead}
              style={StyleSheet.absoluteFill}
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            />
          </View>
          <View style={pageStyles.pageView}>
            <View style={{flex: 1}}>
              { 
                // <Image source={require('../../../assets/images/focus_rect.png')} style={{flex: 1}} resizeMode={'stretch'}/>
              }
            </View>
          </View>

          <View style={{flexBasis: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <CheckBox checked={saveLocation} style={{marginRight: 20}} onPress={handleToggleSaveLocation} />
            <Text style={[styles.txtColor2, pageStyles.appText]}>Use phone location</Text>
          </View>

          <View style={{flexBasis: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <BlueBtn onClick={()=>this.props.goManualQR()} style={{paddingTop: 10, paddingBottom: 20}}>
              <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Manually Add QR Code</Text>
            </BlueBtn>
          </View>

        </View>
      </Container>
    )
  }
}

let pageStyles = StyleSheet.create({
  appText: {
    fontSize: 18,
  },
  pageView: {
    flex: 1,
    position: 'absolute',
  },
})

ViewForAdd12.propTypes = {
  onCancel: PropTypes.func,
  onContinue: PropTypes.func,
  addAgain: PropTypes.func,
  onBarCodeRead: PropTypes.func,
  saving: PropTypes.any,
  goManualQR: PropTypes.func,
}

export default ViewForAdd12

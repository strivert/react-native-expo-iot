import React, { Component } from 'react'
import { Container, CheckBox, Spinner } from 'native-base'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { BarCodeScanner, Permissions, Svg } from 'expo'

import styles from '../../../styles'
import Bar2 from '../../common/Bar2'

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
        <View style={{margin: 40, marginLeft: 50, marginRight: 50, marginBottom: 10}}>
          <Text style={[styles.txtColor2, pageStyles.appText, styles.textCenter]}>
            Now scan the QR code on the chargepoint
          </Text>
        </View>
        <View style={{flex: 1, position: 'relative'}}>
          <View style={{flexGrow: 1}}>
            <BarCodeScanner
              onBarCodeRead={handleBarcodeRead}
              style={StyleSheet.absoluteFill}
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            />
          </View>
          <View style={pageStyles.pageView}>
            <View style={{width: svgSize, height: svgSize}}>
              <Svg height={svgSize} width={svgSize}>
                <Svg.G scale={svgSize / 87.8} originX={8}>
                  <Svg.G>
                    <Svg.Polygon points="13.2,30 12.2,30 12.2,12.2 30,12.2 30,13.2 13.2,13.2" />
                  </Svg.G>
                  <Svg.G>
                    <Svg.Polygon points="70,13.2 70,12.2 87.8,12.2 87.8,30 86.8,30 86.8,13.2" />
                  </Svg.G>
                  <Svg.G>
                    <Svg.Polygon points="86.8,70 87.8,70 87.8,87.8 70,87.8 70,86.8 86.8,86.8" />
                  </Svg.G>
                  <Svg.G>
                    <Svg.Polygon points="30,86.8 30,87.8 12.2,87.8 12.2,70 13.2,70 13.2,86.8" />
                  </Svg.G>
                </Svg.G>
              </Svg>
            </View>
          </View>

          <View style={{flexBasis: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <CheckBox checked={saveLocation} style={{marginRight: 20}} onPress={handleToggleSaveLocation} />
            <Text style={[styles.txtColor2, pageStyles.appText]}>Us phone location</Text>
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
})

ViewForAdd12.propTypes = {
  onCancel: PropTypes.func,
  onContinue: PropTypes.func,
  addAgain: PropTypes.func,
  onBarCodeRead: PropTypes.func,
  saving: PropTypes.any,
}

export default ViewForAdd12

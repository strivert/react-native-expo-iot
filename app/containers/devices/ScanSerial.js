import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { BarCodeScanner, Permissions, Svg } from 'expo'
import {
  Text,
  View,
  CheckBox,
  ListItem,
} from 'native-base'
import {StyleSheet, Dimensions} from 'react-native'

class ScanSerial extends Component {
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
    const svgSize = width < height - 240 ? width : height - 240

    if (hasCameraPermission === null) {
      return <View></View>
    }

    if (hasCameraPermission !== true) {
      return <View padder>
        <Text>No access to camera</Text>
      </View>
    }

    return <View style={{flex: 1}}>
      <View style={{flexGrow: 1}}>
        <BarCodeScanner
          onBarCodeRead={handleBarcodeRead}
          style={StyleSheet.absoluteFill}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        />
      </View>
      <View style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}>
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
      <View padder style={{flexBasis: 120}}>
        <Text bold>Scan the QR code on your intro pack</Text>
        <Text>The QR code is located in your intro pack. Ensure it is aligned with the edges.</Text>
        <ListItem style={{borderBottomWidth: 0}} onPress={handleToggleSaveLocation}>
          <CheckBox checked={saveLocation} style={{marginRight: 20}} onPress={handleToggleSaveLocation} /><Text>Save location</Text>
        </ListItem>
      </View>
    </View>
  }
}

ScanSerial.propTypes = {
  onBarCodeRead: PropTypes.func.isRequired,
}

export default connect(
  state => ({
  }),
  dispatch => bindActionCreators({}, dispatch)
)(ScanSerial)

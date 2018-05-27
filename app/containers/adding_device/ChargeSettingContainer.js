import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Modal as NativeModal, Dimensions } from 'react-native'
import { Container, Header, Left, Button, Icon } from 'native-base'

import {withRouter} from 'react-router-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import styles from '../../styles'

import Bar from '../../components/common/Bar'
import BlueBtn from '../../components/common/BlueBtn'
import PageHeaderBack from '../../components/common/PageHeaderBack'
import Bar2 from '../../components/common/Bar2'
import Spinner from '../../components/common/Spinner'

import { setSerialNumber } from '../../actions/particleActions'

import { MapView, Svg, BarCodeScanner } from 'expo'

class ChargeSettingContainer extends Component {
  constructor (props) {
    super(props)

    this.handleOpenScan = this.handleOpenScan.bind(this)
    this.handleCloseScan = this.handleCloseScan.bind(this)
    this.handleBarcodeRead = this.handleBarcodeRead.bind(this)

    this.state = {
      scanningSerial: false,
    }
  }

  handleOpenScan () {
    this.setState({ scanningSerial: true })
  }

  handleCloseScan () {
    this.setState({ scanningSerial: false })
  }

  handleBarcodeRead (data) {
    this.setState({saving: true, scanningSerial: false})

    this.props.setSerialNumber(this.props.selectedDeviceId, data.data.toString())
      .then(() => this.setState({
        saving: false,
      }))
  }

  render () {
    const {devicesHash, selectedDeviceId, user} = this.props
    const { scanningSerial } = this.state
    const { handleOpenScan, handleCloseScan, handleBarcodeRead } = this
    const selectedDevice = devicesHash[selectedDeviceId]

    if (!selectedDevice || !('variables' in selectedDevice) || !('location' in selectedDevice.variables) || !('latitude' in selectedDevice.variables.location)) {
      return (
        <Container style={[pageStyles.moreWrapper, {alignItems: 'center', justifyContent: 'center'}]}>
          <Spinner />
        </Container>
      )
    }

    const deviceName = selectedDevice.name
    const deviceSerialNumber = ('variables' in selectedDevice) ? selectedDevice.variables.serialNumber : ''
    const userAddress1 = user.address1

    const {width, height} = Dimensions.get('window')
    const svgSize = width < height - 340 ? width : height - 340

    let locationItem = {
      location: {
        latitude: ('variables' in selectedDevice) ? parseFloat(parseFloat(selectedDevice.variables.location.latitude).toFixed(10)) : 0,
        longitude: ('variables' in selectedDevice) ? parseFloat(parseFloat(selectedDevice.variables.location.longitude).toFixed(10)) : 0,
        // latitudeDelta: this.checkKeyExist('location', item.variables) ? parseFloat(item.variables.location.latitudeDelta) : 0,
        // longitudeDelta: this.checkKeyExist('location', item.variables) ? parseFloat(item.variables.location.longitudeDelta) : 0,
        latitudeDelta: 0.6,
        longitudeDelta: 0.6,
      },
    }

    return (
      <Container style={pageStyles.moreWrapper}>
        <PageHeaderBack pageName='ChargePoint' {...this.props}/>
        <View style={{marginTop: 20}}></View>
        <Bar
          barText='Name'
        />

        <View style={[pageStyles.flexRowView, pageStyles.currencyWrapper, pageStyles.paddingLeftRight49]}>
          <View style={{flex: 0.8}}>
            <Text style={[styles.txtColor2, pageStyles.currenctyText]}>{deviceName}</Text>
          </View>
          <View style={{flex: 0.2, alignItems: 'flex-end'}}>
            <BlueBtn style={[]} onClick={() => {}}>
              <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Edit</Text>
            </BlueBtn>
          </View>
        </View>

        <Bar
          barText='Serial No'
        />

        <View style={[pageStyles.flexRowView, pageStyles.currencyWrapper, pageStyles.paddingLeftRight49]}>
          <View style={{flex: 0.8}}>
            <Text style={[styles.txtColor2, pageStyles.currenctyText]}>{deviceSerialNumber}</Text>
          </View>
          <View style={{flex: 0.2, alignItems: 'flex-end'}}>
            <BlueBtn style={[]} onClick={handleOpenScan}>
              <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Edit</Text>
            </BlueBtn>
          </View>
        </View>

        <NativeModal
          onRequestClose={handleCloseScan}
          animationType="slide"
          visible={scanningSerial}
          style={{flex: 1}}
        >
          <Container>
            <Header>
              <Left>
                <Button hasText transparent style={{alignItems: 'center'}} onPress={handleCloseScan}>
                  <Icon style={{display: 'flex'}} name="arrow-back" />
                  <Text>Cancel</Text>
                </Button>
              </Left>
            </Header>
            <View style={{flex: 1}}>

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
                <View style={pageStyles.qrScanView}>
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
              </View>

            </View>
          </Container>
        </NativeModal>

        <Bar
          barText='Location'
        />

        <View style={[pageStyles.flexRowView, pageStyles.currencyWrapper, pageStyles.paddingLeftRight49]}>
          <View style={{flex: 0.8}}>
            <Text style={[styles.txtColor2, pageStyles.currenctyText]}>{userAddress1}</Text>
          </View>
          <View style={{flex: 0.2, alignItems: 'flex-end'}}>
            <BlueBtn style={[]} onClick={() => {}}>
              <Text style={[styles.blueBtnTextColor, pageStyles.appText]}>Edit</Text>
            </BlueBtn>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: locationItem.location.latitude + 0.145,
              longitude: locationItem.location.longitude - 0.525,
              latitudeDelta: locationItem.location.latitudeDelta,
              longitudeDelta: locationItem.location.longitudeDelta,
            }}
          >
            <MapView.Marker
              // coordinate={item.location}
              coordinate={{
                latitude: locationItem.location.latitude,
                longitude: locationItem.location.longitude,
              }}
            />
            <View style={{flex: 1, position: 'absolute', width: '100%', height: 207}}>
              <Image source={ require('../../assets/images/gradient.png') } style={{width: '100%', height: '100%', resizeMode: 'stretch'}} />
            </View>
          </MapView>
          <View style={{flex: 1, position: 'absolute', bottom: 0, width: '100%', height: 207, backgroundColor: 'transparent'}}>
          </View>
        </View>
      </Container>
    )
  }
}

let pageStyles = StyleSheet.create({
  qrScanView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  moreWrapper: {
    backgroundColor: '#FFFFFF',
  },
  paddingLeftRight49: {
    paddingLeft: 36,
    paddingRight: 36,
  },
  paddingLeftRight42: {
    paddingLeft: 42,
    paddingRight: 42,
  },
  marginLeftRight16: {
    marginLeft: 16,
    marginRight: 16,
  },
  currencyWrapper: {
    paddingTop: 17,
    paddingBottom: 17,
  },
  flexRowView: {
    flexDirection: 'row',
  },
  currenctyText: {
    fontSize: 18,
  },
  percentText: {
    fontSize: 18,
  },
  nextText: {
    fontSize: 18,
  },
  AppWrapper: {
    paddingTop: 18,
    paddingBottom: 18,
  },
  appText: {
    fontSize: 18,
  },
})

ChargeSettingContainer.propTypes = {
  user: PropTypes.object,
  devicesHash: PropTypes.object,
  selectedDeviceId: PropTypes.any,
  setSerialNumber: PropTypes.func.isRequired,
}

export default withRouter(connect(
  state => ({
    devicesHash: state.particle.devicesHash,
    selectedDeviceId: state.particle.selectedDeviceId,
    user: state.user,
  }),
  dispatch => bindActionCreators({ setSerialNumber }, dispatch)
)(ChargeSettingContainer))

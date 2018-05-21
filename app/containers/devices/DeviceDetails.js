import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  Text,
  Button,
  Header,
  Right,
  Left,
  Body,
  Icon,
  Container,
  View,
} from 'native-base'
import {get} from 'lodash'
import {Modal as NativeModal, Alert} from 'react-native'
import {MapView} from 'expo'
import {renameDevice, setSerialNumber, setLocation} from '../../actions/particleActions'
import ScanSerial from './ScanSerial'
import Dialog from '../../components/Dialog'
import Loading from '../../components/Loading'
import EditLocation from './EditLocation'
import locationService from '../../services/locationService'

class DeviceDetails extends Component {
  constructor (props) {
    super(props)

    this.handlePressRename = this.handlePressRename.bind(this)
    this.handleCloseRename = this.handleCloseRename.bind(this)
    this.handleSaveRename = this.handleSaveRename.bind(this)

    this.handlePressScan = this.handlePressScan.bind(this)
    this.handleCloseScan = this.handleCloseScan.bind(this)
    this.handleSerialRead = this.handleSerialRead.bind(this)

    this.handlePressEditLocation = this.handlePressEditLocation.bind(this)
    this.handleCloseLocation = this.handleCloseLocation.bind(this)
    this.handleLocationSet = this.handleLocationSet.bind(this)
    this.handleSaveLocation = this.handleSaveLocation.bind(this)

    this.state = {
      editingName: false,
      scanningSerial: false,
      saving: false,
      editingLocation: false,
      error: null,
    }

    this.editLocationElement = undefined
  }

  handlePressRename () {
    this.setState({name: this.props.device.name, saving: false, editingName: true})
  }

  handleCloseRename () {
    this.setState({editingName: false})
  }

  handleSaveRename (text) {
    this.setState({editingName: false, saving: true})
    this.props.renameDevice(this.props.device.id, text)
      .then(() => this.setState({saving: false}))
  }

  handlePressScan () {
    this.setState({scanningSerial: true})
  }

  handleCloseScan () {
    this.setState({scanningSerial: false})
  }

  handleSerialRead (data, saveLocation) {
    this.setState({saving: true, scanningSerial: false})

    const promises = [this.props.setSerialNumber(this.props.device.id, data.data.toString())]

    if (saveLocation) {
      promises.push(
        locationService.getLocation()
          .then(coords => {
            return this.props.setLocation(this.props.device.id, coords)
          }, err => Alert.alert('Error', err))
      )
    }

    Promise.all(promises)
      .then(() => this.setState({saving: false}))
  }

  handleSaveLocation () {
    this.editLocationElement && this.editLocationElement.handleSave()
  }

  handlePressEditLocation () {
    this.setState({editingLocation: true})
  }

  handleCloseLocation () {
    this.setState({editingLocation: false})
  }

  handleLocationSet (location) {
    this.setState({saving: true, editingLocation: false})
    this.props.setLocation(this.props.device.id, location)
      .then(() => this.setState({saving: false}))
  }

  render () {
    const {device} = this.props
    const {editingName, saving, scanningSerial, editingLocation} = this.state
    const {
      handlePressRename,
      handleCloseRename,
      handleSaveRename,
      handlePressScan,
      handleCloseScan,
      handleSerialRead,
      handlePressEditLocation,
      handleCloseLocation,
      handleLocationSet,
      handleSaveLocation,
    } = this
    const location = get(device, 'variables.location')

    return <View deviceDetails>
      {saving && <Loading />}
      <View deviceDetailsSection>
        <Text style={{marginBottom: 10}}>Device Name:</Text>
        <View deviceDetailsField style={{flexDirection: 'row'}}>
          <Text boxText style={{marginRight: 20}}>{device.name}</Text>
          <Button andersenButton onPress={handlePressRename}>
            <Text>EDIT</Text>
          </Button>
        </View>
        <Dialog
          title="Rename"
          isVisible={editingName}
          onSubmit={handleSaveRename}
          onClose={handleCloseRename}
          defaultValue={device.name}
        />
      </View>

      <View deviceDetailsSection>
        <Text style={{marginBottom: 10}}>Serial number:</Text>
        <View deviceDetailsField style={{flexDirection: 'row'}}>
          <Text boxText style={{marginRight: 20}}>{get(device, 'variables.serialNumber')}</Text>
          <Button andersenButton onPress={handlePressScan}>
            <Text>EDIT</Text>
          </Button>
          <NativeModal
            onRequestClose={handleCloseScan}
            animationType="slide"
            visible={scanningSerial}
            style={{flex: 1}}
          >
            <Container>
              <Header>
                <Left>
                  <Button hasText transparent onPress={handleCloseScan}>
                    <Icon name="arrow-back" />
                    <Text>Cancel</Text>
                  </Button>
                </Left>
                <Body></Body>
              </Header>
              <ScanSerial onBarCodeRead={handleSerialRead} deviceId={device.id} />
            </Container>
          </NativeModal>
        </View>
      </View>
      <View deviceDetailsSection>
        <Text style={{marginBottom: 10}}>Location:</Text>
        <View deviceDetailsField style={{flexDirection: 'row'}}>
          {location && <MapView
            liteMode={true}
            region={location}
            style={{flex: 1, height: 150, marginRight: 20}}
            provider="google"
            cacheEnabled={true}
            scrollEnabled={false}
            rotateEnabled={false}
            zoomEnabled={false}
            loadingEnabled={true}
          >
            <MapView.Marker coordinate={location} />
          </MapView>}
          <Button andersenButton onPress={handlePressEditLocation} style={{alignSelf: 'flex-start'}}>
            <Text>EDIT</Text>
          </Button>
        </View>
        <NativeModal
          onRequestClose={handleCloseLocation}
          animationType="slide"
          visible={editingLocation}
          style={{flex: 1}}
        >
          <Container>
            <Header>
              <Left>
                <Button hasText transparent style={{alignItems: 'center'}} onPress={handleCloseLocation}>
                  <Icon style={{display: 'flex'}} name="arrow-back" />
                  <Text>Cancel</Text>
                </Button>
              </Left>
              <Right>
                <Button hasText transparent onPress={handleSaveLocation}><Text>Save</Text></Button>
              </Right>
            </Header>
            <EditLocation onRef={ref => (this.editLocationElement = ref)} onSet={handleLocationSet} coords={location} />
          </Container>
        </NativeModal>
      </View>
    </View>
  }
}

DeviceDetails.propTypes = {
  device: PropTypes.object,
  renameDevice: PropTypes.func.isRequired,
  setSerialNumber: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
}

export default connect(
  state => ({
  }),
  dispatch => bindActionCreators({renameDevice, setSerialNumber, setLocation}, dispatch)
)(DeviceDetails)

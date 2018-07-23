import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, ListView, ActivityIndicator } from 'react-native'
import { Container } from 'native-base'

import {withRouter} from 'react-router-native'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'

import styles from '../../styles'

import config from '../../config/config'

import PageTop from '../../components/common/PageTop'
import Bar from '../../components/common/Bar'
import BlueBtn from '../../components/common/BlueBtn'
import Border from '../../components/common/Border'
import PageHeaderBack from '../../components/common/PageHeaderBack'
import Spinner from '../../components/common/Spinner'
import {selectedDeviceId as selectDevice} from '../../actions/particleActions'
import {postGetChargeHistory} from '../../services/particleService'

class ChargeHistoryContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: null,
      isLoading: true,
      isLoadingMore: false,
      total: null,
      page: 0,
      isLoadingMore: false,
      _data: null,
    }
  }

  componentDidMount () {
    this.fetchData(responseJson => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      });
      const data = responseJson.data.data;
      
      this.setState({
        dataSource: ds.cloneWithRows(data),
        isLoading: false,
        _data: data,
        total: responseJson.data.recordsTotal,
        page: (this.state.page + 1),
      });
    });
  }

  fetchData = (callback) => {
    const {selectedDeviceId} = this.props
    postGetChargeHistory(selectedDeviceId, this.state.page * config.CHARGE_HISTORY_COUNT)
      .then(callback)
      .catch(error => {
        console.error(error);
      });
  }

  fetchMore = () => {
    if ( this.state.page >= Math.ceil(this.state.total / config.CHARGE_HISTORY_COUNT)) {
      this.setState({
        isLoadingMore: false,
      })

    } else {
      if (this.state.isLoadingMore) {
        return;
      }
      this.setState({
        isLoadingMore: true
      })
      this.fetchData(responseJson => {
        const data = this.state._data.concat(responseJson.data.data);

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data),
          isLoadingMore: false,
          _data: data,
          page: (this.state.page + 1),
        });
      });
    }
  }

  render () {
    return (
      <Container style={pageStyles.moreWrapper}>
        <PageHeaderBack pageName='Home' isGoBack={true} {...this.props} />
        <PageTop
          iconName='charge1'
          firstText='Charge History'
          secondText='Last 50 Days'
        />

        {
          this.state.isLoading &&
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Spinner/>
          </View>
        }

        {
          this.state.total === 0 &&
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[styles.txtColor2, {fontSize: 18}]}>No Charge History</Text>
          </View>
        }

        {
          this.state.total > 0 &&
          <ListView
            dataSource={this.state.dataSource}
            renderRow={rowData => {
              let charge_date_res = rowData.chargedate.split('-')
              let charge_date = charge_date_res[1] + '-' + charge_date_res[2] + '-' + charge_date_res[0].substr(-2)
              return (
                <View>
                  <Bar
                    barText={charge_date}
                  />

                  <View style={[pageStyles.paddingLeftRight42, pageStyles.AppWrapper]}>
                    <View style={pageStyles.flexRowView}>
                      <View style={{flex: 0.6}}>
                        <Text style={[styles.txtColor2, pageStyles.appText]}>Charge Start</Text>
                      </View>
                      <View style={{flex: 0.4}}>
                        <Text style={[styles.txtColor2, pageStyles.appText]}>{rowData.starttime}</Text>
                      </View>
                    </View>
                  </View>
                  <Border style={pageStyles.marginLeftRight16} />
                  <View style={[pageStyles.paddingLeftRight42, pageStyles.AppWrapper]}>
                    <View style={pageStyles.flexRowView}>
                      <View style={{flex: 0.6}}>
                        <Text style={[styles.txtColor2, pageStyles.appText]}>Charge Duration</Text>
                      </View>
                      <View style={{flex: 0.4}}>
                        <Text style={[styles.txtColor2, pageStyles.appText]}>{rowData.chargingtime}</Text>
                      </View>
                    </View>
                  </View>
                  <Border style={pageStyles.marginLeftRight16} />
                  <View style={[pageStyles.paddingLeftRight42, pageStyles.AppWrapper]}>
                    <View style={pageStyles.flexRowView}>
                      <View style={{flex: 0.6}}>
                        <Text style={[styles.txtColor2, pageStyles.appText]}>Energy Usage</Text>
                      </View>
                      <View style={{flex: 0.4}}>
                        <Text style={[styles.txtColor2, pageStyles.appText]}>{rowData.total} kWh</Text>
                      </View>
                    </View>
                  </View>
                  <Border style={pageStyles.marginLeftRight16} />
                  <View style={[pageStyles.paddingLeftRight42, pageStyles.AppWrapper]}>
                    <View style={pageStyles.flexRowView}>
                      <View style={{flex: 0.6}}>
                        <Text style={[styles.txtColor2, pageStyles.appText]}>Charge Cost</Text>
                      </View>
                      <View style={{flex: 0.4}}>
                        <Text style={[styles.txtColor2, pageStyles.appText]}>£ {rowData.consumption}</Text>
                      </View>
                    </View>
                  </View>

                </View>
              )
            }}
            onEndReached={() =>{
              this.fetchMore()
            }}
            renderFooter={() => {
              return (
                this.state.isLoadingMore &&
                <View style={{ flex: 1, padding: 10 }}>
                  <ActivityIndicator size="small" />
                </View>
              );
            }}
          />
        }
      </Container>
    )
  }
}

let pageStyles = StyleSheet.create({
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

ChargeHistoryContainer.propTypes = {
  user: PropTypes.object,
  devicesHash: PropTypes.object,
  navigation: PropTypes.any,
  selectedDeviceId: PropTypes.any,
  isFrom: PropTypes.any,
  deviceCount: PropTypes.any,
  selectDevice: PropTypes.func,
  devices: PropTypes.array,
}

export default withRouter(connect(
  state => ({
    devicesHash: state.particle.devicesHash,
    devices: state.particle.devices,
    selectedDeviceId: state.particle.selectedDeviceId,
    user: state.user,
    deviceCount: state.particle.deviceCount,
  }),
  dispatch => bindActionCreators({selectDevice}, dispatch)
)(ChargeHistoryContainer))

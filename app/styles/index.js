import {StyleSheet} from 'react-native'
import variable from '../../native-base-theme/variables/platform'

export default StyleSheet.create({
  flex: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexShrink: {
    flexShrink: 1,
  },
  disabledText: {
    color: '#ccc',
  },
  appWrap: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  appContainer: {
    flexGrow: 1,
    backgroundColor: '#e9eaee',
  },
  textWhite: {
    color: '#fff',
  },
  pad: {
    padding: 10,
  },
  marginTop: {
    marginTop: 10,
  },
  centerHeight: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  modalBackdrop: {
    flexGrow: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 24,
    justifyContent: 'center',
  },
  modalView: {
    padding: 24,
    backgroundColor: variable.bg,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomWidth: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
  },
  modalButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'normal',
    marginLeft: 16,
    padding: 10,
  },
  modalGridButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  modalButtonDisabled: {
    color: '#666',
  },
  label: {
    lineHeight: 24,
    color: '#666',
    fontSize: 12,
  },
  wifiScan: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  hotspotItem: {
    height: 45,
    backgroundColor: '#fff',
    paddingRight: 15,
    marginLeft: 15,
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#c9c9c9',
    borderBottomWidth: 0.5,
  },
})
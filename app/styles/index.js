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
    color: '#ccc', // #ccc
  },
  appWrap: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  appContainer: {
    flexGrow: 1,
    backgroundColor: '#e9eaee', // #e9eaee
  },
  textWhite: {
    color: '#fff', // #fff
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 7f7f7f
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
    color: '#fff', // #fff
    fontSize: 16,
    fontWeight: 'normal',
    marginLeft: 16,
    padding: 10,
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  modalGridButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  modalButtonDisabled: {
    color: '#666', // #666
  },
  label: {
    lineHeight: 24,
    color: '#666', // #666
    fontSize: 12,
  },
  wifiScan: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  hotspotItem: {
    height: 45,
    backgroundColor: '#fff', // #fff
    paddingRight: 15,
    marginLeft: 15,
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#c9c9c9', // #c9c9c9
    borderBottomWidth: 0.5,
  },
  bgColor: {
    backgroundColor: '#FFFFFF',
  },
  bgModalColor: {
    backgroundColor: '#e9eaee',
  },
  txtColor: {
    color: '#707070',
    fontFamily: 'Proxima_nova_light',
  },
  txtColor2: {
    color: '#373636',
    fontFamily: 'Proxima_nova_light',
  },
  inputBorder: {
    borderColor: '#666',
    borderWidth: 0.5,
  },
  blueBtnTextColor: {
    color: '#218FD8',
    fontFamily: 'Proxima_nova_light',
  },
  paddingLeftRight36: {
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
})

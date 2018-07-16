import color from 'color'

import { Platform, Dimensions, PixelRatio } from 'react-native'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
const platform = Platform.OS
const platformStyle = undefined
const isIphoneX = platform === 'ios' && deviceHeight === 812 && deviceWidth === 375
const bg = '#212121'
const bg2 = '#505050'

export default {
  bg,
  bg2,
  platformStyle,
  platform,
  // AndroidRipple
  androidRipple: true,
  androidRippleColor: 'rgba(256, 256, 256, 0.3)',
  androidRippleColorDark: 'rgba(0, 0, 0, 0.15)',

  // Badge
  badgeBg: '#ED1727',
  badgeColor: '#fff',
  // New Variable
  badgePadding: platform === 'ios' ? 3 : 0,

  // Button
  btnFontFamily: 'Proxima_nova_altbold',
  btnDisabledBg: '#b5b5b5',
  btnDisabledClr: '#f1f1f1',

  // CheckBox
  CheckboxRadius: platform === 'ios' ? 0 : 0,
  CheckboxBorderWidth: platform === 'ios' ? 1 : 2,
  CheckboxPaddingLeft: platform === 'ios' ? 7 : 4,
  CheckboxPaddingBottom: platform === 'ios' ? 0 : 5,
  CheckboxIconSize: platform === 'ios' ? 35 : 24,
  CheckboxIconMarginTop: platform === 'ios' ? undefined : 1,
  CheckboxFontSize: platform === 'ios' ? 40 : 28,
  DefaultFontSize: 17,
  checkboxBgColor: '#039BE5',
  checkboxSize: 30,
  checkboxTickColor: '#fff',

  // Segment
  segmentBackgroundColor: platform === 'ios' ? '#F8F8F8' : '#3F51B5',
  segmentActiveBackgroundColor: platform === 'ios' ? '#007aff' : '#fff',
  segmentTextColor: platform === 'ios' ? '#007aff' : '#fff',
  segmentActiveTextColor: platform === 'ios' ? '#fff' : '#3F51B5',
  segmentBorderColor: platform === 'ios' ? '#007aff' : '#fff',
  segmentBorderColorMain: platform === 'ios' ? '#a7a6ab' : '#3F51B5',

  // New Variable
  get defaultTextColor () {
    return this.textColor
  },

  get btnPrimaryBg () {
    return this.brandPrimary
  },
  get btnPrimaryColor () {
    return this.inverseTextColor
  },
  get btnInfoBg () {
    return this.brandInfo
  },
  get btnInfoColor () {
    return this.inverseTextColor
  },
  get btnSuccessBg () {
    return this.brandSuccess
  },
  get btnSuccessColor () {
    return this.inverseTextColor
  },
  get btnDangerBg () {
    return this.brandDanger
  },
  get btnDangerColor () {
    return this.inverseTextColor
  },
  get btnWarningBg () {
    return this.brandWarning
  },
  get btnWarningColor () {
    return this.inverseTextColor
  },
  get btnTextSize () {
    return platform === 'ios' ? this.fontSizeBase * 1.1 : this.fontSizeBase - 1
  },
  get btnLineHeight () {
    return platform === 'ios' ? this.fontSizeBase * 1.1 : this.fontSizeBase - 1
  },
  get btnTextSizeLarge () {
    return this.fontSizeBase * 1.5
  },
  get btnTextSizeSmall () {
    return this.fontSizeBase * 0.8
  },
  get borderRadiusLarge () {
    return this.fontSizeBase * 3.8
  },

  buttonPadding: 6,

  get iconSizeLarge () {
    return this.iconFontSize * 1.5
  },
  get iconSizeSmall () {
    return this.iconFontSize * 0.6
  },

  // Card
  cardDefaultBg: bg,

  // Color
  brandPrimary: platform === 'ios' ? '#a0b7b1' : '#a0b7b1',
  brandInfo: '#62B1F6',
  brandSuccess: '#5cb85c',
  brandDanger: '#d9534f',
  brandWarning: '#f0ad4e',
  brandSidebar: '#252932',
  brandDark: '#000',
  brandLight: '#f4f4f4',

  // Font
  fontFamily: 'Proxima_nova',
  fontSizeBase: 15,

  get fontSizeH1 () {
    return this.fontSizeBase * 1.8
  },
  get fontSizeH2 () {
    return this.fontSizeBase * 1.6
  },
  get fontSizeH3 () {
    return this.fontSizeBase * 1.4
  },

  // Footer
  footerHeight: isIphoneX ? 89 : 57,
  footerDefaultBg: platform === 'ios' ? bg2 : bg2,
  footerPaddingBottom: isIphoneX ? 34 : 0,

  // FooterTab
  tabBarTextColor: '#000000', // custom footer txt color
  tabBarTextSize: platform === 'ios' ? 14 : 11,
  activeTab: platform === 'ios' ? '#007aff' : '#fff',
  sTabBarActiveTextColor: '#007aff',
  tabBarActiveTextColor: '#218FD8', // custom active
  tabActiveBgColor: '#F2F2F2', // custom footer tab bg

  // Tab
  tabDefaultBg: platform === 'ios' ? '#F8F8F8' : '#3F51B5',
  topTabBarTextColor: platform === 'ios' ? '#6b6b6b' : '#b3c7f9',
  topTabBarActiveTextColor: platform === 'ios' ? '#007aff' : '#fff',
  topTabActiveBgColor: platform === 'ios' ? '#cde1f9' : undefined,
  topTabBarBorderColor: platform === 'ios' ? '#a7a6ab' : '#fff',
  topTabBarActiveBorderColor: platform === 'ios' ? '#007aff' : '#fff',

  // Header
  toolbarBtnColor: platform === 'ios' ? '#fff' : '#fff',
  toolbarDefaultBg: platform === 'ios' ? bg2 : bg2,
  toolbarHeight: platform === 'ios' ? (isIphoneX ? 88 : 64) : 56,
  toolbarIconSize: platform === 'ios' ? 20 : 22,
  toolbarSearchIconSize: platform === 'ios' ? 20 : 23,
  toolbarInputColor: platform === 'ios' ? '#CECDD2' : '#fff',
  searchBarHeight: platform === 'ios' ? 30 : 40,
  toolbarInverseBg: '#222',
  toolbarTextColor: platform === 'ios' ? '#fff' : '#fff',
  toolbarDefaultBorder: platform === 'ios' ? '#a7a6ab' : '#3F51B5',
  iosStatusbar: platform === 'ios' ? 'dark-content' : 'light-content',
  get statusBarColor () {
    return color(this.toolbarDefaultBg)
      .darken(0.2)
      .hex()
  },

  // Icon
  iconFamily: 'Ionicons',
  iconFontSize: platform === 'ios' ? 30 : 28,
  iconMargin: 7,
  iconHeaderSize: platform === 'ios' ? 33 : 24,

  // InputGroup
  inputFontSize: 17,
  inputBorderColor: '#D9D5DC',
  inputSuccessBorderColor: '#2b8339',
  inputErrorBorderColor: '#ed2f2f',

  get inputColor () {
    return this.textColor
  },
  get inputColorPlaceholder () {
    return '#ccc'
  },

  inputGroupMarginBottom: 10,
  inputHeightBase: 41,
  inputPaddingLeft: 5,

  get inputPaddingLeftIcon () {
    return this.inputPaddingLeft * 8
  },

  // Line Height
  // btnLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 22,
  iconLineHeight: platform === 'ios' ? 37 : 30,
  lineHeight: platform === 'ios' ? 20 : 24,

  // List
  listBg: bg,
  listBorderColor: bg2,
  listDividerBg: bg2,
  listItemHeight: 45,
  listBtnUnderlayColor: '#DDD',

  // Card
  cardBorderColor: bg2,

  // Changed Variable
  listItemPadding: platform === 'ios' ? 10 : 12,

  listNoteColor: '#808080',
  listNoteSize: 13,

  // Progress Bar
  defaultProgressColor: '#E4202D',
  inverseProgressColor: '#1A191B',

  // Radio Button
  radioBtnSize: platform === 'ios' ? 25 : 23,
  radioSelectedColorAndroid: '#3F51B5',

  // New Variable
  radioBtnLineHeight: platform === 'ios' ? 29 : 24,

  radioColor: '#7e7e7e',

  get radioSelectedColor () {
    return color(this.radioColor)
      .darken(0.2)
      .hex()
  },

  // Spinner
  defaultSpinnerColor: '#45D56E',
  inverseSpinnerColor: '#1A191B',

  // Tabs
  tabBgColor: '#F8F8F8',
  tabFontSize: 15,
  tabTextColor: '#222222',

  // Text
  textColor: '#fff',
  inverseTextColor: '#000',
  noteFontSize: 14,

  // Title
  titleFontfamily: 'Proxima_nova_altbold',
  titleFontSize: platform === 'ios' ? 17 : 19,
  subTitleFontSize: platform === 'ios' ? 12 : 14,
  subtitleColor: platform === 'ios' ? '#8e8e93' : '#FFF',

  // New Variable
  titleFontColor: platform === 'ios' ? '#fff' : '#FFF',

  // Other
  borderRadiusBase: platform === 'ios' ? 5 : 2,
  borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
  contentPadding: 10,

  get darkenHeader () {
    return color(this.tabBgColor)
      .darken(0.03)
      .hex()
  },

  dropdownBg: '#000',
  dropdownLinkColor: '#414142',
  inputLineHeight: 24,
  jumbotronBg: '#C9C9CE',
  jumbotronPadding: 30,
  deviceWidth,
  deviceHeight,
  isIphoneX,

  // New Variable
  inputGroupRoundedBorderRadius: 30,
}

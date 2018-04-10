import variable from './../variables/platform'

export default (variables = variable) => {
  const textTheme = {
    fontSize: variables.DefaultFontSize - 1,
    fontFamily: variables.fontFamily,
    color: variables.textColor,
    '.note': {
      color: '#fff',
      fontSize: variables.noteFontSize,
    },
    '.bold': {
      fontWeight: 'bold',
    },
    '.boxText': {
      borderColor: '#000',
      borderStyle: 'solid',
      backgroundColor: variables.bg2,
      flex: 1,
      marginTop: 0,
      marginBottom: 10,
      paddingLeft: 10,
      width: '100%',
      height: variables.inputHeightBase,
      color: variables.inputColor,
      paddingRight: 5,
      fontSize: variables.inputFontSize,
      lineHeight: variables.inputLineHeight + 14,
      fontFamily: variables.fontFamily,
    },
    '.mt': {
      marginTop: 16,
    },
  }

  return textTheme
}

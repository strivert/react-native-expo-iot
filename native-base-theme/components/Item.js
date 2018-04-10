import { Platform } from 'react-native'

import variable from './../variables/platform'

export default (variables = variable) => {
  const itemTheme = {
    '.floatingLabel': {
      'NativeBase.Input': {
        height: 60,
        top: 8,
      },
      'NativeBase.Label': {
        top: 8,
      },
      'NativeBase.Icon': {
        top: 6,
      },
    },
    '.fixedLabel': {
      'NativeBase.Label': {
        position: null,
        top: null,
        left: null,
        right: null,
        flex: 1,
        height: null,
        width: null,
        fontSize: variables.inputFontSize,
      },
      'NativeBase.Input': {
        flex: 2,
        fontSize: variables.inputFontSize,
      },
    },
    '.stackedLabel': {
      'NativeBase.Label': {
        position: null,
        top: null,
        left: null,
        right: null,
        paddingTop: 5,
        alignSelf: 'flex-start',
        fontSize: variables.inputFontSize - 2,
      },
      'NativeBase.Icon': {
        marginTop: 36,
      },
      'NativeBase.Input': {
        alignSelf: Platform.OS === 'ios' ? 'stretch' : 'flex-start',
        flex: 1,
        width: Platform.OS === 'ios' ? null : variables.deviceWidth - 25,
        fontSize: variables.inputFontSize,
      },
      flexDirection: null,
    },
    '.inlineLabel': {
      'NativeBase.Label': {
        position: null,
        top: null,
        left: null,
        right: null,
        paddingRight: 20,
        height: null,
        width: null,
        fontSize: variables.inputFontSize,
      },
      'NativeBase.Input': {
        paddingLeft: 5,
        fontSize: variables.inputFontSize,
      },
      flexDirection: 'row',
    },
    'NativeBase.Label': {
      fontSize: variables.inputFontSize,
      color: variables.inputColorPlaceholder,
      paddingRight: 5,
    },
    'NativeBase.Icon': {
      fontSize: 24,
      paddingRight: 8,
    },
    'NativeBase.IconNB': {
      fontSize: 24,
      paddingRight: 8,
    },
    'NativeBase.Input': {
      '.multiline': {
        height: null,
      },
      height: variables.inputHeightBase,
      color: variables.inputColor,
      flex: 1,
      top: Platform.OS === 'ios' ? 1.5 : undefined,
      fontSize: variables.inputFontSize,
      lineHeight: variables.inputLineHeight,
    },
    '.underline': {
      'NativeBase.Input': {
        paddingLeft: 15,
      },
      '.success': {
        borderColor: variables.inputSuccessBorderColor,
      },
      '.error': {
        borderColor: variables.inputErrorBorderColor,
      },
      borderWidth: variables.borderWidth * 2,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderColor: variables.inputBorderColor,
    },
    '.regular': {
      borderWidth: 0,
      marginLeft: 0,
      padding: 0,
      marginTop: 10,
      flexDirection: 'column',
      flex: 1,

      'NativeBase.Input': {
        flex: 1,
        marginTop: 0,
        marginBottom: 0,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: variables.bg2,
        width: '100%',
      },
      'NativeBase.Label': {
        fontSize: variables.inputFontSize,
        color: variables.inputColorPlaceholder,
        paddingLeft: 0,
        marginBottom: 5,
        marginTop: 0,
        flex: 1,
        width: '100%',
      },
      'NativeBase.Icon': {
        paddingLeft: 10,
      },
      '.success': {
        'NativeBase.Input': {
          borderColor: variables.inputSuccessBorderColor,
        },
      },
      '.error': {
        'NativeBase.Input': {
          borderColor: variables.inputErrorBorderColor,
        },
      },
    },
    '.rounded': {
      'NativeBase.Input': {
        paddingLeft: 8,
      },
      'NativeBase.Icon': {
        paddingLeft: 10,
      },
      '.success': {
        borderColor: variables.inputSuccessBorderColor,
      },
      '.error': {
        borderColor: variables.inputErrorBorderColor,
      },
      borderWidth: variables.borderWidth * 2,
      borderRadius: 30,
      borderColor: variables.inputBorderColor,
    },

    '.success': {
      'NativeBase.Icon': {
        color: variables.inputSuccessBorderColor,
      },
      'NativeBase.IconNB': {
        color: variables.inputSuccessBorderColor,
      },
      '.rounded': {
        borderRadius: 30,
        borderColor: variables.inputSuccessBorderColor,
      },
      '.regular': {
        borderColor: variables.inputSuccessBorderColor,
      },
      '.underline': {
        borderWidth: variables.borderWidth * 2,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderColor: variables.inputSuccessBorderColor,
      },
      borderColor: variables.inputSuccessBorderColor,
    },

    '.error': {
      'NativeBase.Icon': {
        color: variables.inputErrorBorderColor,
      },
      'NativeBase.IconNB': {
        color: variables.inputErrorBorderColor,
      },
      '.rounded': {
        borderRadius: 30,
        borderColor: variables.inputErrorBorderColor,
      },
      '.regular': {
        borderColor: variables.inputErrorBorderColor,
      },
      '.underline': {
        borderWidth: variables.borderWidth * 2,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderColor: variables.inputErrorBorderColor,
      },
      borderColor: variables.inputErrorBorderColor,
    },
    '.disabled': {
      'NativeBase.Icon': {
        color: '#384850',
      },
      'NativeBase.IconNB': {
        color: '#384850',
      },
    },

    borderWidth: variables.borderWidth * 2,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderColor: variables.inputBorderColor,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2,
  }

  return itemTheme
}

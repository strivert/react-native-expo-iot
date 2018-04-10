import variable from './../variables/platform'

export default (variables = variable) => {
  const viewTheme = {
    '.padder': {
      padding: variables.contentPadding,
    },
    '.padder2': {
      padding: 2 * variables.contentPadding,
    },
    '.sidebarEmail': {
      paddingLeft: 15,
      paddingTop: 10,
      'NativeBase.Text': {
        fontSize: 12,
      },
    },
    '.userDetails': {
      'NativeBase.H2': {
        marginTop: 10,
        marginBottom: 10,
      },
      'NativeBase.Label': {
        fontSize: variables.inputFontSize,
        color: variables.inputColorPlaceholder,
        paddingLeft: 0,
        marginBottom: 10,
        marginTop: 0,
        flex: 1,
        width: '100%',
      },
    },
    '.deviceDetails': {
      width: '100%',
      '.deviceDetailsSection': {
        width: '100%',
      },
      '.deviceDetailsField': {
        flexDirection: 'row',
        width: '100%',
        'NativeBase.Text': {
          flexGrow: 1,
          marginTop: 10,
        },
        'NativeBase.Button': {
          width: 100,
        },
      },
    },
  }

  return viewTheme
}

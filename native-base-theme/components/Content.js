import variable from './../variables/platform'

export default (variables = variable) => {
  const contentTheme = {
    '.padder': {
      padding: variables.contentPadding,
    },
    '.padder2': {
      padding: 2 * variables.contentPadding,
    },
    flex: 1,
    backgroundColor: 'transparent',
    'NativeBase.Segment': {
      borderWidth: 0,
      backgroundColor: 'transparent',
    },
  }

  return contentTheme
}

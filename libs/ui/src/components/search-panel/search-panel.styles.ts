import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    height: getCustomSize(5),
    marginTop: getCustomSize(),
    marginBottom: getCustomSize(2),
    width: '100%'
  },
  close: {
    marginLeft: getCustomSize(2)
  },
  inputContainer: {
    flex: 1
  },
  input: {
    height: getCustomSize(5)
  },
  extraIcon: {
    marginLeft: getCustomSize(2)
  }
});

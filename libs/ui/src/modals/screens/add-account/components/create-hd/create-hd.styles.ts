import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
    paddingHorizontal: getCustomSize(2)
  },
  inputContainer: {
    width: '100%',
    marginBottom: getCustomSize(2.25)
  },
  buttons: {
    paddingHorizontal: 0
  }
});

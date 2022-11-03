import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: getCustomSize(2)
  },
  button: {
    flex: 1
  },
  cancelButton: {
    marginRight: getCustomSize(2)
  }
});

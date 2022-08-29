import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    width: '100%',
    padding: getCustomSize(2)
  },
  cancelButton: {
    marginRight: getCustomSize(2)
  }
});

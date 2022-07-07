import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: getCustomSize(2),
    paddingBottom: getCustomSize(4),
    justifyContent: 'space-between'
  },
  content: {
    flex: 1
  },
  cancelButton: {
    marginRight: getCustomSize(3)
  }
});

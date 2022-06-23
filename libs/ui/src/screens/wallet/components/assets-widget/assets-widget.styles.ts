import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    borderRadius: getCustomSize(1.75),
    overflow: 'hidden'
  },
  upperButtons: {
    marginBottom: getCustomSize(0.25)
  }
});

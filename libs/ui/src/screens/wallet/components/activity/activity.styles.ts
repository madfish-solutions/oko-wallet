import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  tx: {
    borderColor: 'grey',
    borderWidth: getCustomSize(0.25)
  },
  pending: {
    color: 'red',
    height: getCustomSize(6)
  },
  minted: {
    color: 'green',
    height: getCustomSize(6)
  },
  wrapper: {
    height: getCustomSize(16),
    borderWidth: getCustomSize(0.25),
    borderColor: 'black'
  },
  input: {
    height: getCustomSize(4),
    borderWidth: getCustomSize(0.5),
    borderColor: 'grey'
  }
});

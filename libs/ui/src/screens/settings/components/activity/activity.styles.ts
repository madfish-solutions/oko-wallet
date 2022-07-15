import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  tx: {
    borderColor: 'grey',
    borderWidth: getCustomSize(0.25)
  },
  pending: {
    color: 'red'
  },
  minted: {
    color: 'green'
  },
  wrapper: {
    borderWidth: getCustomSize(0.25),
    borderColor: 'black'
  }
});

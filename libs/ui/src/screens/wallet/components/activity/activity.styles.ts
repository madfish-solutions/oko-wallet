import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    borderRadius: getCustomSize(1.75),
    overflow: 'hidden'
  },
  pending: {
    color: 'red',
    height: 50,
    backgroundColor: 'grey'
  },
  minted: {
    color: 'green',
    height: 50,
    backgroundColor: 'grey'
  },
  wrapper: {
    height: 100,
    borderWidth: 2,
    borderColor: 'black'
  },
  input: {
    height: 30,
    borderWidth: 3,
    borderColor: 'grey'
  }
});

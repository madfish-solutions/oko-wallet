import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    height: getCustomSize(5),
    marginVertical: getCustomSize()
  },
  close: {
    marginLeft: getCustomSize(2)
  }
});

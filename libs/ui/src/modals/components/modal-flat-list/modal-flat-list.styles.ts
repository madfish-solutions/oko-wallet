import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: getCustomSize(2)
  },
  search: {
    justifyContent: 'space-between',
    height: getCustomSize(5),
    marginVertical: getCustomSize()
  }
});
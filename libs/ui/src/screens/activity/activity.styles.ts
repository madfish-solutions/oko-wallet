import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  flatlist: {
    marginHorizontal: getCustomSize(2)
  }
});

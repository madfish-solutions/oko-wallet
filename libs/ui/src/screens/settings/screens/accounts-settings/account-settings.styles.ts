import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: getCustomSize(2)
  },
  container: {
    width: '100%'
  },
  list: {
    marginBottom: getCustomSize(2)
  }
});

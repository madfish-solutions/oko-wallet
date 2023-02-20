import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  searchPanel: {
    paddingHorizontal: getCustomSize(2),
    marginBottom: getCustomSize(3)
  },
  container: {
    paddingVertical: 0
  },
  token: {
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: getCustomSize(2)
  },
  borderBottom: {
    borderBottomWidth: getCustomSize(0.125),
    borderBottomColor: colors.border2
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    paddingVertical: 0
  },
  searchPanel: {
    marginBottom: 0
  },
  token: {
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: getCustomSize(2)
  },
  borderBottom: {
    borderBottomWidth: getCustomSize(0.125),
    borderBottomColor: colors.border2
  },
  editIcon: {
    marginRight: getCustomSize(2)
  }
});

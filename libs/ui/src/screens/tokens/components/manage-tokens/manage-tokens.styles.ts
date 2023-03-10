import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    padding: 0
  },
  token: {
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: getCustomSize(2),
    borderTopWidth: getCustomSize(0.0625),
    borderColor: colors.border2
  }
});

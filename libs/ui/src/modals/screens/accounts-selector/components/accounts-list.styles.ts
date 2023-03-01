import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  publicKeyHashContainer: {
    alignSelf: 'flex-end'
  },
  itemBorder: {
    borderWidth: getCustomSize(0.125),
    borderColor: colors.orange
  }
});

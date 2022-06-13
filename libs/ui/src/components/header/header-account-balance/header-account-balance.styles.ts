import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: getCustomSize(0.5),
    color: colors.orange
  },
  balance: {
    marginRight: getCustomSize(0.5),
    color: colors.textGrey1,
    fontSize: getCustomSize(3.5)
  },
  currency: {
    color: colors.textGrey2,
    fontSize: getCustomSize(3.5)
  }
});

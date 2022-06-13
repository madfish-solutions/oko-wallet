import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';

export const AccountInfoStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: getCustomSize(0.5),
    color: colors.orange
  },
  address: {
    fontSize: getCustomSize(1.625),
    color: colors.textGrey1
  },
  currency: {
    marginRight: getCustomSize(0.5),
    color: colors.textGrey2,
    fontSize: getCustomSize(2.75)
  },
  balance: {
    color: colors.textGrey1,
    fontSize: getCustomSize(2.75)
  }
});

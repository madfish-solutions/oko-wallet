import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';
import { userDetailsHeight, userDetailsMarginBottom } from '../../constants/dimensions';

export const styles = StyleSheet.create({
  root: {
    height: userDetailsHeight,
    marginBottom: userDetailsMarginBottom,
    paddingVertical: getCustomSize(1),
    paddingLeft: getCustomSize(1),
    paddingRight: getCustomSize(1.5),
    borderRadius: getCustomSize(2),
    borderWidth: getCustomSize(0.25),
    borderColor: colors.bgGrey2
  },
  active: {
    backgroundColor: colors.bgGrey2
  },
  wrapper: {
    justifyContent: 'space-between'
  },
  marginBottom: {
    marginBottom: getCustomSize()
  },
  name: {
    marginLeft: getCustomSize(0.5),
    ...typography.bodyInterSemiBold15,
    color: colors.textGrey1
  },
  balanceTitle: {
    marginBottom: getCustomSize(0.25),
    ...typography.numbersIBMPlexSansRegular11,
    color: colors.textGrey2
  }
});

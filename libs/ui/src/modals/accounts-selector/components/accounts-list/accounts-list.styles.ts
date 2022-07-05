import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';
import { isWeb } from '../../../../utils/platform.utils';

import { userDetailsHeight, userDetailsMarginBottom } from './constants/dimensions';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: getCustomSize(2),
    ...(isWeb && { paddingBottom: getCustomSize(10) })
  },
  iconsContainer: {
    paddingVertical: getCustomSize(2),
    justifyContent: 'space-between'
  },
  userDetails: {
    height: userDetailsHeight,
    marginBottom: userDetailsMarginBottom,
    paddingVertical: getCustomSize(1),
    paddingLeft: getCustomSize(1),
    paddingRight: getCustomSize(1.5),
    borderRadius: getCustomSize(2),
    borderWidth: getCustomSize(0.25),
    borderColor: colors.bgGrey2
  },
  checkboxContainer: {
    marginBottom: getCustomSize(1),
    justifyContent: 'space-between'
  },
  logo: {
    marginRight: getCustomSize(0.5)
  },
  currentUsername: {
    ...typography.bodyInterSemiBold15,
    color: colors.textGrey1
  },
  editContainer: {
    justifyContent: 'space-between'
  },
  balance: {
    // TODO change to numbersIBMPlexSansRegular11
    ...typography.numbersIBMPlexSansMedium11,
    color: colors.textGrey2,
    marginBottom: getCustomSize(0.25)
  },
  amount: {
    ...typography.numbersIBMPlexSansMedium13,
    color: colors.textGrey1
  },
  currencyContainer: {
    marginLeft: getCustomSize(0.25)
  },
  currency: {
    color: colors.textGrey2
  },
  selectedAccount: {
    backgroundColor: colors.bgGrey2
  }
});

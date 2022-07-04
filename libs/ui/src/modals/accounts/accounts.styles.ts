import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  accountContainer: {
    paddingHorizontal: getCustomSize(2),
    paddingTop: getCustomSize(2),
    paddingBottom: getCustomSize(0.5)
  },
  logoContainer: {
    marginBottom: getCustomSize(1)
  },
  bigLogo: {
    marginRight: getCustomSize(1)
  },
  currentUsername: {
    ...typography.bodyInterSemiBold15,
    color: colors.textGrey1
  },
  numbers: {
    ...typography.numbersIBMPlexSansMedium15,
    color: colors.textGrey1
  },
  dollar: {
    color: colors.textGrey2
  },
  settingsContainer: {
    justifyContent: 'space-between'
  },
  settingsButton: {
    flex: 0,
    paddingVertical: 0
  },
  borderBottom: {
    borderBottomColor: colors.bgGrey1,
    borderBottomWidth: getCustomSize(0.5)
  },
  allAccountsBalanceContainer: {
    paddingHorizontal: getCustomSize(2),
    paddingTop: getCustomSize(2),
    paddingBottom: getCustomSize(1.5)
  },
  allAccountsBalance: {
    ...typography.numbersIBMPlexSansMedium28,
    color: colors.textGrey1
  },
  balance: {
    ...typography.numbersIBMPlexSansMedium11,
    color: colors.textGrey2,
    marginBottom: getCustomSize(0.25)
  },
  allAccountsDollar: {
    ...typography.numbersIBMPlexSansMedium28,
    color: colors.textGrey2,
    marginRight: getCustomSize(1)
  },
  percentage: {
    ...typography.numbersIBMPlexSansMedium13,
    color: colors.textGreen
  }
});

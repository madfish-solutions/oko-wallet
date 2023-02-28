import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  headerWrapper: {
    paddingHorizontal: getCustomSize(2),
    paddingTop: getCustomSize(2),
    paddingBottom: getCustomSize(0.5)
  },
  header: {
    marginBottom: getCustomSize()
  },
  accountBalance: {
    marginRight: getCustomSize(0.25),
    ...typography.numbersIBMPlexSansMedium15,
    color: colors.textGrey1
  },
  accountBalanceCurrency: {
    ...typography.numbersIBMPlexSansMedium15,
    color: colors.textGrey2
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    width: '100%'
  },
  button: {
    flex: 0,
    paddingVertical: 0
  },
  divider: {
    backgroundColor: colors.bgGrey1,
    width: '100%'
  },
  accountsBalanceContainer: {
    paddingHorizontal: getCustomSize(2),
    paddingTop: getCustomSize(2),
    paddingBottom: getCustomSize(1.5)
  },
  accountsBalanceTitle: {
    ...typography.numbersIBMPlexSansRegular11,
    color: colors.textGrey2,
    marginBottom: getCustomSize(0.25)
  },
  accountsBalance: {
    marginRight: getCustomSize(0.25),
    ...typography.numbersIBMPlexSansMedium28,
    color: colors.textGrey1
  },
  accountsBalanceCurrency: {
    ...typography.numbersIBMPlexSansMedium28,
    color: colors.textGrey2
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../../../../../styles/colors';
import { getCustomSize } from '../../../../../../styles/format-size';
import { typography } from '../../../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    backgroundColor: colors.navGrey1,
    borderRadius: getCustomSize(0.5),
    marginBottom: getCustomSize(0.25),
    padding: getCustomSize(1)
  },
  balanceContainer: {
    alignItems: 'flex-end'
  },
  tokenImage: {
    borderColor: colors.bgGrey3,
    width: getCustomSize(3),
    height: getCustomSize(3),
    borderWidth: getCustomSize(0.25),
    borderRadius: getCustomSize(8),
    marginRight: getCustomSize(0.5)
  },
  text: {
    color: colors.textGrey1,
    ...typography.numbersIBMPlexSansMediumUppercase13
  },
  token: {
    width: 'auto'
  },
  usdBalance: {
    color: colors.textGrey1,
    marginTop: getCustomSize(0.25),
    ...typography.numbersIBMPlexSansMedium11
  },
  usdSymbol: {
    color: colors.textGrey3
  }
});

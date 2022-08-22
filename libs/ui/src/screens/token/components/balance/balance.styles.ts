import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    margin: getCustomSize(2)
  },
  title: {
    ...typography.captionInterRegular11,
    color: colors.textGrey2
  },
  balanceInUsd: {
    ...typography.numbersIBMPlexSansMedium13
  },
  currency: {
    marginLeft: getCustomSize(0.25),
    ...typography.numbersIBMPlexSansMedium13,
    color: colors.textGrey2
  },
  balance: {
    ...typography.numbersIBMPlexSansMedium20
  }
});

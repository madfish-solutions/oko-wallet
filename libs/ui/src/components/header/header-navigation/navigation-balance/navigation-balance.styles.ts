import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    alignItems: 'flex-end'
  },
  title: {
    marginBottom: getCustomSize(0.25),
    color: colors.textGrey2,
    ...typography.captionInterRegular11
  },
  wrapper: {
    marginBottom: getCustomSize(0.25)
  },
  dynamic: {
    color: colors.green,
    ...typography.numbersIBMPlexSansMedium13
  },
  amount: {
    marginRight: getCustomSize()
  },
  balance: {
    marginRight: getCustomSize(0.25),
    color: colors.textGrey1,
    ...typography.numbersIBMPlexSansMedium20
  },
  currency: {
    color: colors.textGrey2,
    ...typography.numbersIBMPlexSansMedium20
  }
});

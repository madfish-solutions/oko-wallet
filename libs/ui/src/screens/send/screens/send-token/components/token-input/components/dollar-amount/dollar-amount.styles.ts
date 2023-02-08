import { StyleSheet } from 'react-native';

import { colors } from '../../../../../../../../styles/colors';
import { getCustomSize } from '../../../../../../../../styles/format-size';
import { typography } from '../../../../../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    paddingBottom: getCustomSize(0.5)
  },
  text: {
    color: colors.textGrey2,
    ...typography.numbersIBMPlexSansRegular11
  },
  amount: {
    marginLeft: getCustomSize(0.5),
    marginRight: getCustomSize(0.25),
    color: colors.border1
  },
  amountDefined: {
    color: colors.textGrey4
  },
  amountReadOnly: {
    color: colors.textGrey3
  }
});

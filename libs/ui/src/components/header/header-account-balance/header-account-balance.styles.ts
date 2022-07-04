import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  icon: {
    marginRight: getCustomSize(0.5)
  },
  balance: {
    marginRight: getCustomSize(0.5),
    color: colors.textGrey1
  },
  currency: {
    color: colors.textGrey2
  },
  text: {
    ...typography.numbersIBMPlexSansMedium20
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  amount: {
    ...typography.numbersIBMPlexSansMedium13
  },
  currency: {
    marginLeft: getCustomSize(0.25),
    ...typography.numbersIBMPlexSansMedium13,
    color: colors.textGrey2
  }
});

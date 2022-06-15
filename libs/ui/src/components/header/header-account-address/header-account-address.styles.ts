import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  icon: {
    marginRight: getCustomSize(0.5)
  },
  address: {
    width: getCustomSize(10),
    color: colors.textGrey1,
    ...typography.numbersIBMPlexSansMediumUppercase13,
    letterSpacing: 0.337647
  }
});

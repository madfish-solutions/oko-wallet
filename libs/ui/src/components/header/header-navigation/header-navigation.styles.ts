import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  text: {
    color: colors.textGrey1,
    ...typography.numbersIBMPlexSansMedium22,
    letterSpacing: getCustomSize(0.04375)
  }
});

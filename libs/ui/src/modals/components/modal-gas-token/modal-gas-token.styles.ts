import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  text: {
    ...typography.numbersIBMPlexSansMedium13,
    color: colors.textGrey1
  },
  marginRight: {
    marginRight: getCustomSize(0.25)
  }
});

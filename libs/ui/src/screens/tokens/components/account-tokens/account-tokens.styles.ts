import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  checkboxContainer: {
    marginBottom: getCustomSize(0.5)
  },
  checkboxText: {
    ...typography.captionInterSemiBold11,
    color: colors.textGrey2,
    marginLeft: getCustomSize(0.5)
  }
});

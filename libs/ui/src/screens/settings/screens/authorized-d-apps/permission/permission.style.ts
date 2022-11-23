import { StyleSheet } from 'react-native';

import { colors } from '../../../../../styles/colors';
import { getCustomSize } from '../../../../../styles/format-size';
import { typography } from '../../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    maxWidth: getCustomSize(12)
  },
  label: {
    ...typography.taglineInterSemiBoldUppercase11,
    marginVertical: getCustomSize(0.5)
  },
  text: {
    ...typography.captionInterRegular11,
    textAlign: 'center',
    color: colors.textGrey3,
    marginBottom: getCustomSize(2)
  }
});

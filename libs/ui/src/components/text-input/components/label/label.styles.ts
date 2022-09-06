import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    marginBottom: getCustomSize(0.75)
  },
  label: {
    color: colors.textGrey3,
    ...typography.captionInterRegular13
  },
  optionalText: {
    color: colors.textGrey2,
    opacity: 0.5,
    ...typography.captionInterRegular11
  }
});

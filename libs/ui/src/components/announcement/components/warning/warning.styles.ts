import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  warningText: {
    color: colors.textGrey4,
    ...typography.captionInterSemiBold13
  },
  description: {
    marginTop: getCustomSize(),
    color: colors.textGrey3,
    ...typography.captionInterRegular13
  }
});

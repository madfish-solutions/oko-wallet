import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    marginBottom: getCustomSize()
  },
  promptText: {
    marginRight: getCustomSize(0.5),
    color: colors.textGrey2,
    ...typography.captionInterRegular11
  },
  infoIcon: {
    marginRight: getCustomSize()
  }
});

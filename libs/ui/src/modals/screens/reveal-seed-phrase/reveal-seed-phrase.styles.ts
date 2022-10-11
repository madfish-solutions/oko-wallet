import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    paddingTop: getCustomSize(2),
    paddingHorizontal: getCustomSize(2)
  },
  warning: {
    marginBottom: getCustomSize()
  },
  title: {
    marginBottom: getCustomSize(),
    color: colors.textGrey3,
    ...typography.captionInterRegular13
  },
  description: {
    marginBottom: getCustomSize(0.75),
    color: colors.textGrey2,
    ...typography.captionInterRegular11
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.bgGrey2,
    borderRadius: getCustomSize(1.75),
    marginBottom: getCustomSize(2),
    padding: getCustomSize(1.5)
    // TODO: Add shadow
  },
  title: {
    ...typography.captionInterSemiBold13,
    marginBottom: getCustomSize()
  },
  description: {
    ...typography.captionInterRegular13,
    color: colors.textGrey3
  }
});

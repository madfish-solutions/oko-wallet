import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.bgTransparentYellow,
    paddingVertical: getCustomSize(1.25),
    paddingHorizontal: getCustomSize(1.5),
    borderRadius: getCustomSize(1.75),
    alignItems: 'flex-start'
  },
  icon: {
    marginRight: getCustomSize(0.5),
    color: colors.yellow
  },
  text: {
    ...typography.captionInterSemiBold13,
    color: colors.textGrey4
  }
});

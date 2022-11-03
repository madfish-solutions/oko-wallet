import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    paddingVertical: getCustomSize(1.25),
    paddingHorizontal: getCustomSize(1.5),
    borderRadius: getCustomSize(1.75),
    alignItems: 'flex-start'
  },
  success: {
    backgroundColor: colors.bgTransparentGreen
  },
  warning: {
    backgroundColor: colors.bgTransparentYellow
  },
  error: {
    backgroundColor: colors.bgTransparentRed
  },
  icon: {
    marginRight: getCustomSize(0.5),
    color: colors.yellow
  },
  textWrapper: {
    justifyContent: 'center',
    minHeight: getCustomSize(2.75),
    flex: 1
  },
  text: {
    paddingTop: getCustomSize(0.25),
    ...typography.captionInterSemiBold13,
    color: colors.textGrey4
  }
});

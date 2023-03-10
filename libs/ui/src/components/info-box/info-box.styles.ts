import { StyleSheet } from 'react-native';
import { isAndroid } from 'shared';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.bgGrey2,
    borderRadius: getCustomSize(1.75),
    marginBottom: getCustomSize(2),
    padding: getCustomSize(1.5),
    ...(isAndroid && { elevation: getCustomSize(0.375) }),
    ...(!isAndroid && {
      shadowColor: colors.bgGrey7,
      shadowOffset: {
        width: 0,
        height: getCustomSize(0.125)
      },
      shadowOpacity: getCustomSize(0.0275),
      shadowRadius: getCustomSize(0.2775)
    })
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

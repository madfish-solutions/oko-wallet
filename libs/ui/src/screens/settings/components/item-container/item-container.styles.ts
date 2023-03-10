import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgGrey2,
    borderRadius: getCustomSize(1.75),
    overflow: 'hidden'
  },
  title: {
    marginBottom: getCustomSize(),
    marginLeft: getCustomSize(0.5),
    ...typography.captionInterSemiBold11,
    color: colors.textGrey2
  }
});

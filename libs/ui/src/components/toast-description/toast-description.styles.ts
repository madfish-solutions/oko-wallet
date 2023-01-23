import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  text: {
    ...typography.captionInterRegular13,
    color: colors.textGrey3
  },
  opHash: {
    marginTop: getCustomSize(0.5)
  },
  opHashText: {
    ...typography.captionInterSemiBold11
  },
  marginRight: {
    marginRight: getCustomSize(0.5)
  }
});

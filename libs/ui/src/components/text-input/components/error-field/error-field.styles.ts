import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: -getCustomSize(2.25)
  },
  text: {
    color: colors.red,
    ...typography.captionInterRegular11
  }
});

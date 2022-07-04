import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    paddingLeft: getCustomSize(0.5)
  },
  title: {
    color: colors.textGrey1,
    ...typography.bodyInterRegular15
  }
});

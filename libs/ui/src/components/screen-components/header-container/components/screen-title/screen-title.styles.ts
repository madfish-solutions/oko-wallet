import { StyleSheet } from 'react-native';

import { colors } from '../../../../../styles/colors';
import { getCustomSize } from '../../../../../styles/format-size';
import { typography } from '../../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    paddingTop: getCustomSize(1.625)
  },
  icon: {
    marginBottom: getCustomSize()
  },
  title: {
    maxWidth: getCustomSize(33),
    color: colors.textGrey1,
    ...typography.headlineInterRegular22
  }
});

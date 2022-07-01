import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  icon: {
    marginBottom: getCustomSize()
  },
  title: {
    color: colors.textGrey1,
    ...typography.headlineInterRegular22,
    letterSpacing: getCustomSize(0.04375)
  }
});

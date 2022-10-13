import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonIcon: {
    marginRight: getCustomSize(0.5)
  },
  buttonText: {
    ...typography.taglineInterSemiBoldUppercase13,
    color: colors.orange
  }
});

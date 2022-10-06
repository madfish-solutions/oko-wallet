import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    paddingVertical: getCustomSize(1.25),
    paddingHorizontal: getCustomSize(1.5),
    borderRadius: getCustomSize(2),
    backgroundColor: colors.bgGrey4
  },
  title: {
    marginRight: getCustomSize(2),
    ...typography.taglineInterSemiBoldUppercase13
  }
});

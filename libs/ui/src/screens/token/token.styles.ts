import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-start'
  },
  divider: {
    width: '100%',
    height: getCustomSize(0.5),
    backgroundColor: colors.bgGrey1
  },
  editTokenButton: {
    marginBottom: getCustomSize()
  },
  editText: {
    ...typography.taglineInterSemiBoldUppercase13,
    marginRight: getCustomSize(0.5)
  },
  disabled: {
    color: colors.bgGrey5
  },
  editIcon: {
    marginRight: getCustomSize(2)
  },
  tabs: {
    justifyContent: 'space-between'
  }
});

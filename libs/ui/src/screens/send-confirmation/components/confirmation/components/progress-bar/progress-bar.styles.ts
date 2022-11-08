import { StyleSheet } from 'react-native';

import { colors } from '../../../../../../styles/colors';
import { getCustomSize } from '../../../../../../styles/format-size';
import { typography } from '../../../../../../styles/typography';

export const styles = StyleSheet.create({
  container: {
    width: getCustomSize(5),
    height: getCustomSize(1.5),
    backgroundColor: colors.bgGrey4,
    borderRadius: getCustomSize(0.5),
    borderWidth: getCustomSize(0.125),
    borderColor: colors.border2
  },
  text: {
    ...typography.taglineInterSemiBoldUppercase11,
    color: colors.textGrey4,
    marginRight: getCustomSize()
  },
  item: {
    height: '100%',
    width: getCustomSize(1.5)
  },
  left: {
    borderTopLeftRadius: getCustomSize(0.5),
    borderBottomLeftRadius: getCustomSize(0.5),
    borderTopRightRadius: getCustomSize(0.125),
    borderBottomRightRadius: getCustomSize(0.125)
  },
  center: {
    borderRadius: getCustomSize(0.125)
  },
  right: {
    borderTopLeftRadius: getCustomSize(0.125),
    borderBottomLeftRadius: getCustomSize(0.125),
    borderTopRightRadius: getCustomSize(0.5),
    borderBottomRightRadius: getCustomSize(0.5)
  },
  red: {
    backgroundColor: colors.red
  },
  yellow: {
    backgroundColor: colors.yellow
  },
  green: {
    backgroundColor: colors.green
  },
  divider: {
    width: getCustomSize(0.125),
    height: '100%'
  }
});

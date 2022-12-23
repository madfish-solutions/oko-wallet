import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  item: {
    justifyContent: 'space-between',
    height: getCustomSize(6),
    width: '100%',
    borderBottomWidth: getCustomSize(0.0625),
    borderBottomColor: colors.border2
  },
  name: {
    ...typography.captionInterRegular11,
    color: colors.textGrey3
  },
  value: {
    ...typography.captionInterSemiBold13
  },
  stringValue: {
    ...typography.captionInterSemiBold13,
    color: colors.orange
  },
  icon: {
    marginLeft: getCustomSize()
  }
});

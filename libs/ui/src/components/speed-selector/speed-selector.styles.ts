import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  speedContainer: {
    height: getCustomSize(4.5),
    borderRadius: getCustomSize(2),
    backgroundColor: colors.bgGrey4,
    paddingVertical: getCustomSize(1.25),
    paddingHorizontal: getCustomSize(0.25),
    justifyContent: 'space-between'
  },
  speedItem: {
    height: getCustomSize(4),
    borderWidth: getCustomSize(0.25),
    borderColor: 'transparent',
    borderRadius: getCustomSize(1.75),
    alignItems: 'center',
    justifyContent: 'center',
    width: '23%'
  },
  speedItemText: {
    ...typography.taglineInterSemiBoldUppercase13,
    color: colors.textGrey1
  },
  activeSpeedItem: {
    borderColor: colors.orange
  },
  borderRight: {
    width: getCustomSize(0.0625),
    height: '100%',
    backgroundColor: colors.bgGrey3
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  layout: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgGrey4,
    zIndex: 1
  },
  layoutText: {
    position: 'absolute',
    ...typography.taglineInterSemiBoldUppercase13,
    color: colors.orange
  },
  layoutBlock: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.bgGrey2,
    borderRadius: getCustomSize(0.5)
  }
});

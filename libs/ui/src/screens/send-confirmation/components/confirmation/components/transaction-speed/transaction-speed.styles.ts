import { StyleSheet } from 'react-native';

import { colors } from '../../../../../../styles/colors';
import { getCustomSize } from '../../../../../../styles/format-size';
import { typography } from '../../../../../../styles/typography';

export const styles = StyleSheet.create({
  speedBlock: {
    height: getCustomSize(3),
    justifyContent: 'space-between',
    marginBottom: getCustomSize(0.5)
  },
  speedOfTransactionText: {
    ...typography.captionInterRegular11,
    color: colors.textGrey3
  },
  selectorBlock: {
    marginBottom: getCustomSize(2.5)
  }
});

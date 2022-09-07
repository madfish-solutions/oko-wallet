import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  icon: {
    marginRight: getCustomSize(0.5)
  },
  row: {
    width: '100%'
  },
  symbol: {
    color: colors.textGrey1,
    maxWidth: getCustomSize(10),
    ...typography.bodyInterSemiBold15
  },
  name: {
    color: colors.textGrey1,
    maxWidth: getCustomSize(18),
    ...typography.captionInterRegular11
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  icon: {
    marginRight: getCustomSize(0.5)
  },
  image: {
    width: '100%',
    height: '100%'
  },
  fallback: {
    width: getCustomSize(1.33),
    height: getCustomSize(1.33),
    backgroundColor: colors.border1,
    borderRadius: getCustomSize(0.33)
  },
  row: {
    width: '100%'
  },
  symbol: {
    color: colors.textGrey1,
    ...typography.bodyInterSemiBold15
  },
  name: {
    color: colors.textGrey1,
    ...typography.captionInterRegular11
  }
});

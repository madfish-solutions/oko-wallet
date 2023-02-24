import { StyleSheet } from 'react-native';
import { isWeb } from 'shared';

import { colors } from '../../../../../../styles/colors';
import { getCustomSize } from '../../../../../../styles/format-size';
import { typography } from '../../../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    height: getCustomSize(3),
    justifyContent: 'space-between',
    marginBottom: getCustomSize(0.5)
  },
  title: {
    ...typography.captionInterRegular11,
    color: colors.textGrey3
  },
  maxWidth: {
    maxWidth: getCustomSize(20),
    flexShrink: 1,
    overflow: 'hidden',
    ...(isWeb && { whiteSpace: 'nowrap' })
  },
  number13Text: {
    ...typography.numbersIBMPlexSansMedium13
  },
  symbol: {
    color: colors.textGrey2,
    marginLeft: getCustomSize(0.25)
  },
  icon: {
    marginLeft: getCustomSize()
  }
});

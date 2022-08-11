import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';
import { isMobile, isWeb } from '../../../utils/platform.utils';

const nameWidth = `calc(100vw - ${getCustomSize(12)}px)`;

export const styles = StyleSheet.create({
  icon: {
    marginRight: getCustomSize()
  },
  name: {
    ...typography.bodyInterSemiBold15,
    color: colors.textGrey1,
    marginBottom: getCustomSize(0.5),
    ...(isMobile && { flex: 1 }),
    ...(isWeb && { width: nameWidth })
  },
  balanceTitle: {
    ...typography.numbersIBMPlexSansRegular11,
    color: colors.textGrey2
  }
});

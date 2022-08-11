import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';
import { isWeb, isMobile } from '../../../utils/platform.utils';

export const styles = StyleSheet.create({
  name: {
    marginLeft: getCustomSize(0.5),
    ...typography.bodyInterSemiBold15,
    color: colors.textGrey1,
    ...(isMobile && { flex: 1 }),
    ...(isWeb && { maxWidth: getCustomSize(30) })
  },
  balanceTitle: {
    marginBottom: getCustomSize(0.25),
    ...typography.numbersIBMPlexSansRegular11,
    color: colors.textGrey2
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  name: {
    marginLeft: getCustomSize(0.5),
    ...typography.bodyInterSemiBold15,
    color: colors.textGrey1
  },
  nameContainer: {
    maxWidth: getCustomSize(30)
  },
  balanceTitle: {
    marginBottom: getCustomSize(0.25),
    ...typography.numbersIBMPlexSansRegular11,
    color: colors.textGrey2
  },
  balanceContainer: {
    maxWidth: getCustomSize(30)
  },
  textContainer: {
    flex: 1
  }
});

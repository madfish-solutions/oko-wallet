import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    width: '100%'
  },
  icon: {
    marginRight: getCustomSize()
  },
  name: {
    ...typography.bodyInterSemiBold15,
    color: colors.textGrey1,
    marginBottom: getCustomSize(0.5)
  },
  textContainer: {
    flex: 1
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  balanceTitle: {
    ...typography.numbersIBMPlexSansRegular11,
    color: colors.textGrey2
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  renderItem: {
    height: getCustomSize(10.125)
  },
  symbol: {
    ...typography.numbersIBMPlexSansMedium13
  },
  dollarContainer: {
    marginBottom: getCustomSize(0.25)
  },
  dollarAmount: {
    ...typography.numbersIBMPlexSansMedium11
  },
  dollarSign: {
    marginLeft: getCustomSize(0.25),
    ...typography.numbersIBMPlexSansMedium11,
    color: colors.textGrey2
  },
  amount: {
    ...typography.numbersIBMPlexSansMediumUppercase13
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../../../../../styles/colors';
import { getCustomSize } from '../../../../../../styles/format-size';
import { typography } from '../../../../../../styles/typography';
import { isWeb } from '../../../../../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    alignItems: 'flex-end'
  },
  dollarContainer: { marginVertical: getCustomSize(0.25) },
  grey: {
    color: colors.textGrey2
  },
  numbersFontText11: { ...typography.numbersIBMPlexSansRegular11 },
  numbersFontText13: { ...typography.numbersIBMPlexSansMedium13 },
  numbersFontText15: { ...typography.numbersIBMPlexSansMedium15 },
  dollar: {
    marginLeft: getCustomSize(0.25)
  },
  symbol: {
    marginLeft: getCustomSize(0.25),
    maxWidth: isWeb ? getCustomSize(8) : getCustomSize(9.5)
  }
});

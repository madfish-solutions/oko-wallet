import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';
import { isAndroid } from '../../../../utils/platform.utils';

export const styles = StyleSheet.create({
  screenTitle: {
    maxWidth: getCustomSize(20)
  },
  assetContainer: {
    flexDirection: 'column-reverse',
    paddingTop: getCustomSize(1.5),
    ...(!isAndroid && { paddingBottom: getCustomSize(2) })
  },
  amountInput: {
    ...typography.numbersIBMPlexSansMedium20,
    ...(!isAndroid && { height: getCustomSize(3.125) })
  },
  selectAsset: {
    maxWidth: getCustomSize(14)
  },
  dollarAmountContainer: {
    marginTop: getCustomSize(2),
    marginBottom: getCustomSize(0.5)
  },
  text: {
    color: colors.textGrey2,
    ...typography.numbersIBMPlexSansRegular11
  },
  dollarAmount: {
    marginLeft: getCustomSize(0.5),
    marginRight: getCustomSize(0.25),
    color: colors.border1
  }
});

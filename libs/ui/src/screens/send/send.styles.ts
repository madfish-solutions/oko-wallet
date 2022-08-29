import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';
import { isMobile } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  assetContainer: {
    flexDirection: 'column-reverse',
    paddingTop: getCustomSize(1.5),
    paddingBottom: getCustomSize(2)
  },
  amountInput: { ...typography.numbersIBMPlexSansMedium20, height: getCustomSize(3.125) },
  dollarAmountContainer: { marginTop: getCustomSize(2), marginBottom: getCustomSize(0.5) },
  text: {
    color: colors.textGrey2,
    ...typography.numbersIBMPlexSansRegular11
  },
  dollarAmount: { marginLeft: getCustomSize(0.5), marginRight: getCustomSize(0.25), color: colors.border1 },
  transferBetweenAccountsContainer: {
    marginTop: getCustomSize(4.625),
    marginBottom: getCustomSize()
  },
  transferBetweenAccountsText: {
    ...typography.captionInterSemiBold13,
    marginLeft: getCustomSize(0.5)
  },
  greyText: {
    color: colors.textGrey2
  },
  publicKeyHashContainer: {
    paddingTop: getCustomSize(1.75),
    justifyContent: 'space-between',
    paddingBottom: getCustomSize(1),
    height: getCustomSize(14.75)
  },
  publicKeyHashInput: {
    ...typography.numbersIBMPlexSansMedium15,
    height: isMobile ? getCustomSize(7.75) : getCustomSize(10)
  },
  publicKeyHashClearIcon: {
    alignSelf: 'flex-start'
  },
  publicKeyHashFooter: {
    justifyContent: 'space-between',
    paddingRight: getCustomSize(0.25)
  },
  warning: {
    marginTop: getCustomSize(4.625)
  },
  sendButtonContainer: {
    paddingHorizontal: getCustomSize(2),
    marginBottom: isMobile ? getCustomSize(4) : getCustomSize(2),
    height: getCustomSize(5)
  }
});

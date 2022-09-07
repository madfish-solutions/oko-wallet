import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';
import { isMobile, isAndroid, isWeb } from '../../utils/platform.utils';

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
    marginBottom: getCustomSize(2)
  },
  publicKeyHashInputContainer: {
    paddingTop: getCustomSize(1.75),
    justifyContent: 'space-between',
    paddingBottom: isMobile ? getCustomSize(1) : getCustomSize(1.75),
    height: isMobile ? getCustomSize(14.75) : getCustomSize(9)
  },
  publicKeyHashInput: {
    ...typography.numbersIBMPlexSansMedium15,
    height: isMobile ? getCustomSize(7.75) : getCustomSize(4.875),
    textAlignVertical: 'top'
  },
  publicKeyHashClearIcon: {
    alignSelf: 'flex-start',
    ...(isAndroid && { marginTop: getCustomSize(0.75) }),
    ...(isWeb && { marginTop: -getCustomSize(0.5) })
  },
  publicKeyHashFooter: {
    justifyContent: 'space-between',
    paddingRight: getCustomSize(0.25)
  },
  warning: {
    marginBottom: getCustomSize(2.125)
  },
  sendButtonContainer: {
    paddingHorizontal: getCustomSize(2),
    marginBottom: isMobile ? getCustomSize(4) : getCustomSize(2),
    height: getCustomSize(5)
  }
});

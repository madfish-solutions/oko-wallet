import { StyleSheet } from 'react-native';
import { isMobile, isAndroid, isWeb } from 'shared';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    marginTop: getCustomSize(4.625)
  },
  transferBetweenAccountsContainer: {
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
  }
});

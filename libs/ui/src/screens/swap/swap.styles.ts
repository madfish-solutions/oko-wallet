import { StyleSheet } from 'react-native';
import { isMobile } from 'shared';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-end'
  },
  errorFromAmount: {
    bottom: -getCustomSize(isMobile ? 2 : 3.75)
  },
  swapIcon: {
    alignItems: 'center',
    marginTop: getCustomSize(3.125),
    marginBottom: getCustomSize(0.125)
  },
  routeBlock: {
    marginTop: getCustomSize(4.625),
    marginBottom: getCustomSize(2.6875),
    justifyContent: 'space-between'
  },
  route: {
    ...typography.captionInterRegular13,
    color: colors.textGrey3
  },
  routesText: {
    color: colors.orange,
    ...typography.taglineInterSemiBoldUppercase11
  },
  swapFirst: {
    ...typography.captionInterRegular11,
    color: colors.textGrey2
  },
  routingFeeBlock: {
    justifyContent: 'space-between',
    marginBottom: getCustomSize(0.875)
  },
  caption11: {
    ...typography.captionInterRegular11,
    color: colors.textGrey3
  },
  numbers13: {
    ...typography.numbersIBMPlexSansMedium13,
    color: colors.textGrey3
  },
  exchangeRateBlock: {
    justifyContent: 'space-between',
    marginBottom: getCustomSize(1.25)
  },
  exchangeRate: {
    maxWidth: getCustomSize(26)
  },
  divider: {
    width: '100%',
    height: getCustomSize(0.0625),
    backgroundColor: colors.bgGrey3
  },
  slippageToleranceBlock: {
    justifyContent: 'space-between',
    marginTop: getCustomSize(1.25),
    marginBottom: getCustomSize(0.75)
  },
  slippageToleranceNumber: {
    ...typography.numbersIBMPlexSansMedium13,
    color: colors.textGrey4
  },
  swapButton: {
    paddingHorizontal: getCustomSize(2),
    marginTop: getCustomSize(2),
    marginBottom: isMobile ? getCustomSize(4) : getCustomSize(2),
    height: getCustomSize(5)
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-evenly',
    marginBottom: getCustomSize(2)
  },
  tokenInfo: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: getCustomSize(8),
    height: getCustomSize(8),
    borderColor: colors.bgGrey3,
    borderWidth: getCustomSize(0.25),
    borderRadius: getCustomSize(8),
    marginBottom: getCustomSize(2)
  },
  symbol: {
    ...typography.bodyInterSemiBold15,
    color: colors.textGrey3,
    marginBottom: getCustomSize(0.5)
  },
  amount: {
    ...typography.numbersIBMPlexSansMedium15
  },
  icon: {
    alignSelf: 'flex-start',
    marginTop: getCustomSize(2.5),
    marginHorizontal: getCustomSize(0.5)
  },
  divider: {
    backgroundColor: colors.bgGrey3,
    width: '100%',
    height: getCustomSize(0.0625)
  },
  account: {
    marginVertical: getCustomSize(2)
  },
  swapInfo: {
    backgroundColor: colors.bgGrey2,
    borderRadius: getCustomSize(2),
    marginBottom: getCustomSize(3.5),
    overflow: 'hidden'
  },
  swapInfoRow: {
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: getCustomSize(2.1875),
    paddingHorizontal: getCustomSize(1.5)
  },
  textSemiBold: {
    ...typography.captionInterSemiBold11,
    color: colors.textGrey4
  },
  textRegular: {
    ...typography.captionInterRegular11,
    color: colors.textGrey4
  },
  partialDivider: {
    marginLeft: getCustomSize(2)
  },
  transactionSpeed: {
    marginVertical: getCustomSize()
  }
});

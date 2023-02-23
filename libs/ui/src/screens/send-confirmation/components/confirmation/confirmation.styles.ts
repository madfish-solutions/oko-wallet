import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  container: {
    marginBottom: getCustomSize(2.125)
  },
  title: {
    ...typography.captionInterRegular13,
    marginBottom: getCustomSize(0.75),
    color: colors.textGrey3
  },
  networkContainer: {
    backgroundColor: colors.bgGrey4,
    borderRadius: getCustomSize(),
    padding: getCustomSize(1.5)
  },
  networkName: {
    ...typography.bodyInterSemiBold15,
    marginLeft: getCustomSize(0.5)
  },
  operationContainer: {
    backgroundColor: colors.bgGrey4,
    borderRadius: getCustomSize(),
    paddingVertical: getCustomSize(1.5),
    paddingHorizontal: getCustomSize(1.5)
  },
  sendBlock: {
    marginBottom: getCustomSize(1.125),
    justifyContent: 'space-between'
  },
  operationText: {
    ...typography.captionInterSemiBold13,
    color: colors.textGrey3
  },
  amount: {
    ...typography.numbersIBMPlexSansMedium15,
    color: colors.textGrey4
  },
  symbol: {
    ...typography.numbersIBMPlexSansMedium15
  },
  symbolColor: {
    color: colors.textGrey2,
    marginLeft: getCustomSize(0.25)
  },
  receiverBlock: {
    justifyContent: 'space-between'
  },
  footerMargin: {
    marginBottom: getCustomSize(3.625)
  },
  storageFeeInputContainer: {
    marginTop: getCustomSize(3.25)
  }
});

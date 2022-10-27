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
    paddingTop: getCustomSize(1.625),
    paddingHorizontal: getCustomSize(1.5),
    paddingBottom: getCustomSize(1.5)
  },
  sendBlock: {
    marginBottom: getCustomSize(1.375),
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
  speedBlock: {
    height: getCustomSize(3),
    justifyContent: 'space-between',
    marginBottom: getCustomSize(0.5)
  },
  speedOfTransactionText: {
    ...typography.captionInterRegular11,
    color: colors.textGrey3
  },
  speedContainer: {
    height: getCustomSize(4.5),
    borderRadius: getCustomSize(2),
    backgroundColor: colors.bgGrey4,
    paddingVertical: getCustomSize(1.25),
    paddingHorizontal: getCustomSize(0.25),
    justifyContent: 'space-between',
    marginBottom: getCustomSize(2.5)
  },
  speedItem: {
    height: getCustomSize(4),
    borderWidth: getCustomSize(0.25),
    borderColor: 'transparent',
    borderRadius: getCustomSize(1.75),
    alignItems: 'center',
    justifyContent: 'center',
    width: '23%'
  },
  speedItemText: {
    ...typography.taglineInterSemiBoldUppercase13,
    color: colors.textGrey1
  },
  activeSpeedItem: {
    borderColor: colors.orange
  },
  borderRight: {
    width: getCustomSize(0.0625),
    height: '100%',
    backgroundColor: colors.bgGrey3
  },
  footerMargin: {
    marginBottom: getCustomSize(3.625)
  },
  storageFeeInputContainer: {
    marginTop: getCustomSize(3.25)
  }
});

import { StyleSheet } from 'react-native';
import { isWeb, isAndroid } from 'shared';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  screenTitle: {
    maxWidth: getCustomSize(isWeb ? 40 : 50),
    flexGrow: 1,
    flexShrink: 1
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: colors.bgGrey4,
    borderRadius: getCustomSize(),
    padding: getCustomSize(1.5),
    justifyContent: 'space-between',
    height: getCustomSize(isAndroid ? 15.5 : 14.75),
    borderWidth: getCustomSize(0.125),
    borderColor: colors.bgGrey4
  },
  focusedContainer: {
    borderColor: colors.border2
  },
  errorContainer: {
    borderColor: colors.red
  },
  nftWrapper: {
    flex: 1,
    alignItems: 'stretch'
  },
  nftImage: {
    marginRight: getCustomSize(2)
  },
  shitIcon: {
    backgroundColor: colors.navGrey1
  },
  flex1: {
    flex: 1
  },
  availableAmountContainer: {
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  nftNameContainer: {
    maxWidth: getCustomSize(isWeb ? 15 : isAndroid ? 19.5 : 18),
    flexShrink: 1
  },
  noNftContainer: {
    maxWidth: getCustomSize(20)
  },
  nftName: {
    ...typography.bodyInterSemiBold15
  },
  availableContainer: {
    alignItems: 'flex-end'
  },
  greyText: {
    color: colors.textGrey2,
    ...typography.numbersIBMPlexSansRegular11
  },
  availableNumber: {
    color: colors.textGrey4,
    ...typography.numbersIBMPlexSansMedium11,
    marginTop: getCustomSize(0.25)
  },
  amountContainer: {
    flex: 1,
    marginTop: getCustomSize(2.5)
  },
  amountInputContainer: {
    borderColor: colors.bgGrey4,
    paddingLeft: 0
  },
  amountInput: {
    flex: 1,
    ...typography.numbersIBMPlexSansMedium20,
    height: getCustomSize(isAndroid ? 5.25 : 3),
    textAlignVertical: 'center'
  },
  amountLabelContainer: {
    marginBottom: getCustomSize(0.5)
  },
  amountLabelText: {
    color: colors.border1,
    ...typography.captionInterRegular11
  },
  amountErrorContainer: {
    position: 'absolute',
    bottom: -getCustomSize(2.25)
  },
  amountError: {
    color: colors.red,
    ...typography.captionInterRegular11
  }
});

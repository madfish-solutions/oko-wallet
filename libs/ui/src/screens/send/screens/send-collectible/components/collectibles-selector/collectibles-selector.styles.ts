import { StyleSheet } from 'react-native';
import { isWeb } from 'shared';

import { colors } from '../../../../../../styles/colors';
import { getCustomSize } from '../../../../../../styles/format-size';
import { typography } from '../../../../../../styles/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: getCustomSize(10.375),
    padding: getCustomSize(1),
    marginBottom: getCustomSize(2),
    alignItems: 'stretch',
    justifyContent: 'space-between',
    borderWidth: getCustomSize(0.125),
    borderColor: colors.bgGrey2,
    borderRadius: getCustomSize(2),
    backgroundColor: colors.bgGrey2
  },
  selectedContainer: {
    borderColor: colors.orange
  },
  flex1: {
    flex: 1
  },
  greyText: {
    color: colors.textGrey2,
    ...typography.numbersIBMPlexSansRegular11
  },
  amountNumber: {
    ...typography.numbersIBMPlexSansMedium13
  },
  collectionName: {
    maxWidth: getCustomSize(isWeb ? 20 : 22),
    ...typography.captionInterSemiBold13
  },
  nftNameContainer: {
    justifyContent: 'space-between'
  },
  nftImage: {
    marginRight: getCustomSize(),
    borderRadius: getCustomSize(1.5),
    overflow: 'hidden'
  },
  nftWrapper: {
    flex: 1,
    alignItems: 'stretch'
  },
  nftName: {
    maxWidth: getCustomSize(isWeb ? 25 : 27),
    ...typography.bodyInterSemiBold15
  },
  availableContainer: {
    alignItems: 'flex-end'
  },

  availableNumber: {
    color: colors.textGrey4,
    ...typography.numbersIBMPlexSansMedium11,
    marginTop: getCustomSize(0.25)
  },
  amountContainer: {
    flex: 1,
    marginTop: getCustomSize(1)
  },
  divider: {
    backgroundColor: colors.border2,
    marginHorizontal: getCustomSize(1.5),
    height: getCustomSize(4.125),
    width: getCustomSize(0.0625)
  },
  emptySearchIcon: {
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: -1,
    marginTop: -getCustomSize(2)
  },
  warning: {
    marginTop: getCustomSize(2),
    marginHorizontal: getCustomSize(2),
    marginBottom: getCustomSize(2),
    backgroundColor: colors.bgGrey6
  }
});

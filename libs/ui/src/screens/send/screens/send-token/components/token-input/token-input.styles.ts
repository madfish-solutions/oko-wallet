import { StyleSheet } from 'react-native';

import { colors } from '../../../../../../styles/colors';
import { getCustomSize } from '../../../../../../styles/format-size';
import { typography } from '../../../../../../styles/typography';
import { isAndroid } from '../../../../../../utils/platform.utils';

export const styles = StyleSheet.create({
  readOnlyBlock: {
    backgroundColor: colors.bgGrey4,
    borderRadius: getCustomSize()
  },
  readOnlySelect: {
    paddingTop: getCustomSize(1.5),
    paddingHorizontal: getCustomSize(1.5)
  },
  readOnlyInput: {
    paddingTop: getCustomSize(),
    paddingBottom: getCustomSize(1.75),
    paddingHorizontal: getCustomSize(1.25),
    backgroundColor: colors.bgGrey2,
    borderRadius: getCustomSize(0.75),
    marginHorizontal: getCustomSize(0.25),
    marginBottom: getCustomSize(0.25)
  },
  readOnlyAmount: {
    color: colors.textGrey3,
    ...typography.numbersIBMPlexSansMedium20
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
  max: {
    position: 'absolute',
    bottom: getCustomSize(1),
    right: getCustomSize(1.5)
  }
});

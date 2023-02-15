import { StyleSheet } from 'react-native';
import { isAndroid } from 'shelter/utils/platform.utils';

import { getCustomSize } from '../../../../../../styles/format-size';
import { typography } from '../../../../../../styles/typography';

export const styles = StyleSheet.create({
  assetContainer: {
    flexDirection: 'column-reverse',
    paddingTop: getCustomSize(1.5),
    ...(!isAndroid && { paddingBottom: getCustomSize(2) })
  },
  amountInput: {
    ...typography.numbersIBMPlexSansMedium20,
    ...(!isAndroid && { height: getCustomSize(3.125) })
  },
  maxButton: {
    position: 'absolute',
    bottom: getCustomSize(1),
    right: getCustomSize(1.5)
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    marginBottom: getCustomSize()
  },
  rateUpdates: {
    ...typography.numbersIBMPlexSansMedium11,
    color: colors.textGrey2
  },
  timeBlock: {
    borderRadius: getCustomSize(),
    borderWidth: getCustomSize(0.125),
    borderColor: colors.border1,
    paddingHorizontal: getCustomSize(0.5),
    paddingVertical: getCustomSize(0.6875),
    marginLeft: getCustomSize(0.5)
  },
  time: {
    ...typography.numbersIBMPlexSansMedium11,
    color: colors.textGrey1
  }
});

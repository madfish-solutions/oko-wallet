import { StyleSheet } from 'react-native';

import { colors } from '../../../../../../styles/colors';
import { getCustomSize } from '../../../../../../styles/format-size';
import { typography } from '../../../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.bgGrey4,
    borderRadius: getCustomSize()
  },
  select: {
    paddingTop: getCustomSize(1.5),
    paddingHorizontal: getCustomSize(1.5)
  },
  input: {
    paddingTop: getCustomSize(),
    paddingBottom: getCustomSize(1.75),
    paddingHorizontal: getCustomSize(1.25),
    backgroundColor: colors.bgGrey2,
    borderRadius: getCustomSize(0.75),
    marginHorizontal: getCustomSize(0.25),
    marginBottom: getCustomSize(0.25)
  },
  amount: {
    color: colors.textGrey3,
    ...typography.numbersIBMPlexSansMedium20
  }
});

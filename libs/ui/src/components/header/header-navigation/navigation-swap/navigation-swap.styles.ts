import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    alignItems: 'flex-end'
  },
  wrapper: {
    marginBottom: getCustomSize()
  },
  text: {
    color: colors.textGrey2,
    ...typography.numbersIBMPlexSansMedium11
  },
  timer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: getCustomSize(5),
    height: getCustomSize(3),
    marginLeft: getCustomSize(0.5),
    paddingHorizontal: getCustomSize(0.5),
    paddingVertical: getCustomSize(0.75),
    borderWidth: getCustomSize(0.25),
    borderColor: colors.bgGrey3,
    borderRadius: getCustomSize()
  },
  number: {
    color: colors.textGrey1,
    ...typography.numbersIBMPlexSansMedium11
  }
});

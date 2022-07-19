import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  block: {
    marginBottom: getCustomSize(2)
  },
  title: {
    marginBottom: getCustomSize(1.5),
    color: colors.textGrey1,
    ...typography.numbersIBMPlexSansMedium20
  },
  label: {
    marginBottom: getCustomSize(0.5),
    color: colors.textGrey1,
    ...typography.bodyInterRegular15
  },
  componentOffset: {
    marginBottom: getCustomSize()
  }
});

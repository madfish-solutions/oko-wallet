import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    paddingVertical: getCustomSize(0.25),
    paddingHorizontal: getCustomSize(),
    backgroundColor: colors.brown,
    borderRadius: getCustomSize(0.5),
    overflow: 'hidden',
    ...typography.numbersIBMPlexSansMediumUppercase13,
    textAlign: 'center'
  }
});

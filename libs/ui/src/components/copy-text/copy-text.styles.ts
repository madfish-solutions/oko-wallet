import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    height: getCustomSize(2.75),
    paddingHorizontal: getCustomSize(),
    backgroundColor: colors.brown,
    borderRadius: getCustomSize(0.5),
    overflow: 'hidden'
  },
  text: {
    ...typography.numbersIBMPlexSansMediumUppercase13,
    textAlign: 'center'
  }
});

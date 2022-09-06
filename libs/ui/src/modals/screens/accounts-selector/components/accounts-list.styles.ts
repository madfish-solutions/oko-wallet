import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  publicKeyHashContainer: {
    alignSelf: 'flex-end',
    backgroundColor: colors.bgBrown,
    paddingHorizontal: getCustomSize(),
    paddingVertical: getCustomSize(0.25)
  },
  text: { ...typography.numbersIBMPlexSansMedium13 }
});

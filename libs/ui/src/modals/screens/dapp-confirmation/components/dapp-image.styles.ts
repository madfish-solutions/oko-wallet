import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  imageContainer: {
    height: getCustomSize(8),
    width: getCustomSize(8),
    borderColor: colors.border2,
    borderWidth: getCustomSize(0.25),
    borderRadius: getCustomSize(2),
    alignItems: 'center',
    justifyContent: 'center'
  }
});

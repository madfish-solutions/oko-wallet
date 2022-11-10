import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    borderColor: colors.border2,
    borderWidth: getCustomSize(0.25),
    borderRadius: getCustomSize(1.6875),
    alignItems: 'center',
    justifyContent: 'center'
  },
  small: {
    height: getCustomSize(4),
    width: getCustomSize(4)
  },
  large: {
    height: getCustomSize(8),
    width: getCustomSize(8)
  },
  image: {
    width: getCustomSize(6),
    height: getCustomSize(6),
    borderRadius: getCustomSize()
  }
});

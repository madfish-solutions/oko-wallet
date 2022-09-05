import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%'
  },
  fallback: {
    width: getCustomSize(1.33),
    height: getCustomSize(1.33),
    backgroundColor: colors.border1,
    borderRadius: getCustomSize(0.33)
  }
});

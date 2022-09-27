import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.bgGrey2,
    borderRadius: getCustomSize(1.75),
    overflow: 'hidden'
  }
});

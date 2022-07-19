import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    position: 'relative',
    height: getCustomSize(3),
    width: getCustomSize(6),
    borderRadius: getCustomSize()
  },
  primary: {
    backgroundColor: colors.orange
  },
  secondary: {
    backgroundColor: colors.border1
  },
  tertiary: {
    backgroundColor: colors.bgGrey5
  },
  knob: {
    position: 'absolute',
    top: 2,
    left: 2,
    bottom: 2,
    width: '50%',
    borderRadius: getCustomSize(0.75),
    backgroundColor: colors.navGrey1
  }
});

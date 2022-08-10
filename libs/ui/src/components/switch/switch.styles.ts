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
    backgroundColor: colors.border1
  },
  activePrimary: {
    backgroundColor: colors.orange
  },
  secondary: {
    backgroundColor: colors.bgGrey5
  },
  knob: {
    position: 'absolute',
    top: getCustomSize(0.25),
    left: getCustomSize(0.25),
    bottom: getCustomSize(0.25),
    width: '50%',
    borderRadius: getCustomSize(0.75),
    backgroundColor: colors.navGrey1
  },
  disabled: {
    backgroundColor: colors.bgGrey5
  },
  disabledKnob: {
    backgroundColor: colors.navGrey1
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    padding: getCustomSize(0.2),
    borderWidth: getCustomSize(0.25),
    borderColor: colors.bgGrey2,
    backgroundColor: colors.navGrey1
  },
  primary: {
    width: getCustomSize(4),
    height: getCustomSize(4),
    borderRadius: getCustomSize(1.375)
  },
  secondary: {
    width: getCustomSize(3),
    height: getCustomSize(3),
    borderRadius: getCustomSize(6)
  }
});

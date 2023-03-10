import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: getCustomSize(0.25),
    borderColor: colors.bgGrey3,
    backgroundColor: colors.navGrey1,
    overflow: 'hidden'
  },
  primary: {
    width: getCustomSize(4),
    height: getCustomSize(4),
    borderRadius: getCustomSize(1.375)
  },
  secondary: {
    width: getCustomSize(5),
    height: getCustomSize(5),
    borderRadius: getCustomSize(6)
  },
  ternary: {
    width: getCustomSize(3),
    height: getCustomSize(3),
    borderRadius: getCustomSize(6)
  },
  quaternary: {
    width: getCustomSize(8),
    height: getCustomSize(8),
    borderRadius: getCustomSize(2)
  },
  quinary: {
    width: getCustomSize(4),
    height: getCustomSize(4),
    borderRadius: getCustomSize(6)
  }
});

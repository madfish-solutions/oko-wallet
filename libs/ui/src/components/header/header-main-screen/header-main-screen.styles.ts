import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {},
  row: {
    backgroundColor: colors.bgGrey2,
    zIndex: 1
  },
  icon: {
    marginRight: getCustomSize(2)
  },
  accountBalance: {
    marginLeft: 'auto'
  },
  qrCode: {
    position: 'absolute',
    bottom: getCustomSize(2.5),
    right: 0,
    left: 0,
    marginHorizontal: getCustomSize(2),
    zIndex: -1
  }
});

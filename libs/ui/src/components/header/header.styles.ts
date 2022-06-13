import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    padding: getCustomSize(2),
    backgroundColor: colors.bgGrey2,
    borderBottomLeftRadius: getCustomSize(3),
    borderBottomRightRadius: getCustomSize(3)
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  marginBottom: {
    marginBottom: getCustomSize(2)
  },
  qrCode: {
    marginTop: getCustomSize(2)
  },
  balance: {
    marginLeft: 'auto',
    marginBottom: getCustomSize(2)
  }
});

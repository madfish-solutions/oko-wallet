import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    // width: getCustomSize(43),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: getCustomSize(2),
    backgroundColor: colors.navGrey1,
    borderRadius: getCustomSize(1.75)
  },
  wrapper: {
    flex: 2,
    justifyContent: 'space-between',
    marginRight: getCustomSize(2),
    paddingRight: getCustomSize(4),
    borderRightWidth: getCustomSize(0.125),
    borderRightColor: colors.bgGrey2
  },
  text: {
    marginBottom: getCustomSize(1.5),
    color: colors.textGrey3,
    fontSize: getCustomSize(1.375)
  },
  symbol: {
    color: colors.textGrey1,
    textTransform: 'uppercase'
  },
  address: {
    marginBottom: getCustomSize(1.75),
    color: colors.textGrey1,
    fontSize: getCustomSize(1.625),
    lineHeight: getCustomSize(2.25),
    textTransform: 'uppercase'
  },
  icon: {
    color: colors.orange
  },
  container: {
    borderRadius: getCustomSize(0.25),
    overflow: 'hidden'
  },
  qrcode: {
    flex: 1,
    width: getCustomSize(14),
    height: getCustomSize(14),
    backgroundColor: colors.textGrey1,
    borderRadius: getCustomSize(0.5)
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';

export const QRCodeStyles = StyleSheet.create({
  root: {
    // width: getCustomSize(43),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: getCustomSize(2),
    backgroundColor: colors.navGrey1,
    borderRadius: getCustomSize(1.75)
  },
  wrapper: {
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
    width: getCustomSize(18.875),
    marginBottom: getCustomSize(1.75),
    color: colors.textGrey1,
    fontSize: getCustomSize(1.625),
    lineHeight: getCustomSize(2.25),
    textTransform: 'uppercase'
  },
  icon: {
    color: colors.orange
  },
  qrcode: {
    width: getCustomSize(14),
    height: getCustomSize(14),
    backgroundColor: colors.textGrey1,
    borderRadius: getCustomSize(0.5)
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: getCustomSize(2),
    backgroundColor: colors.navGrey1,
    borderRadius: getCustomSize(1.75)
  },
  wrapper: {
    flex: 2,
    marginRight: getCustomSize(2),
    paddingRight: getCustomSize(4),
    borderRightWidth: getCustomSize(0.125),
    borderRightColor: colors.bgGrey2
  },
  text: {
    marginBottom: getCustomSize(1.5),
    color: colors.textGrey3,
    ...typography.captionInterRegular11
  },
  symbol: {
    color: colors.textGrey1,
    ...typography.captionInterRegularUppercase11
  },
  address: {
    marginBottom: getCustomSize(1.75),
    color: colors.textGrey1,
    lineHeight: getCustomSize(2.25),
    ...typography.numbersIBMPlexSansMediumUppercase13,
    letterSpacing: -0.08
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

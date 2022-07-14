import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: getCustomSize(18),
    padding: getCustomSize(2),
    backgroundColor: colors.navGrey1,
    borderRadius: getCustomSize(1.75)
  },
  wrapper: {
    justifyContent: 'space-between',
    flex: 2,
    height: '100%',
    marginRight: getCustomSize(2),
    paddingRight: getCustomSize(4),
    borderRightWidth: getCustomSize(0.125)
  },
  address: {
    color: colors.textGrey1,
    ...typography.numbersIBMPlexSansMediumUppercase13
  },
  iconsWrapper: {
    marginTop: 'auto'
  },
  icon: {
    marginLeft: getCustomSize(2)
  },
  qrCodeWrapper: {
    borderRadius: getCustomSize(0.25),
    overflow: 'hidden'
  }
});

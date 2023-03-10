import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { userDetailsHeight, userDetailsMarginBottom } from '../../constants/dimensions';

export const styles = StyleSheet.create({
  root: {
    height: userDetailsHeight,
    marginBottom: userDetailsMarginBottom,
    paddingTop: getCustomSize(1),
    paddingLeft: getCustomSize(1),
    paddingRight: getCustomSize(1.5),
    borderRadius: getCustomSize(2),
    backgroundColor: colors.bgGrey2
  },
  active: {
    borderWidth: getCustomSize(0.125),
    borderColor: colors.orange
  },
  wrapper: {
    justifyContent: 'space-between',
    marginBottom: getCustomSize(),
    flex: 1
  }
});

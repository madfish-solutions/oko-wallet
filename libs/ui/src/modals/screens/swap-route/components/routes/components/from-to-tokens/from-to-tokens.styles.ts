import { StyleSheet } from 'react-native';

import { colors } from '../../../../../../../styles/colors';
import { getCustomSize } from '../../../../../../../styles/format-size';
import { typography } from '../../../../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    paddingBottom: getCustomSize(),
    borderBottomWidth: getCustomSize(0.0625),
    borderBottomColor: colors.border2
  },
  symbol: {
    ...typography.taglineInterSemiBoldUppercase13,
    color: colors.textGrey4
  },
  arrow: {
    marginHorizontal: getCustomSize()
  },
  square: {
    width: getCustomSize(),
    height: getCustomSize(),
    borderWidth: getCustomSize(0.125),
    borderColor: colors.bgGrey2,
    padding: getCustomSize(0.25),
    borderRadius: getCustomSize(0.25),
    position: 'absolute',
    left: -getCustomSize(3.5),
    bottom: getCustomSize(2),
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  greySquare: {
    width: getCustomSize(0.5),
    height: getCustomSize(0.5),
    backgroundColor: colors.textGrey6,
    borderRadius: getCustomSize(0.125)
  }
});

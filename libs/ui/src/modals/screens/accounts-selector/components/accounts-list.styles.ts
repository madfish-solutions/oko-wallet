import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  publicKeyHashContainer: {
    alignSelf: 'flex-end'
  },
  accountType: {
    alignItems: 'center',
    height: getCustomSize(2.5),
    paddingHorizontal: getCustomSize(),
    backgroundColor: colors.bgGrey4,
    borderRadius: getCustomSize()
  },
  accountTypeName: {
    ...typography.numbersIBMPlexSansBold8,
    lineHeight: undefined,
    color: colors.textGrey3
  },
  accountTypeIcon: {
    marginRight: getCustomSize(0.125)
  },
  itemBorder: {
    borderWidth: getCustomSize(0.125),
    borderColor: colors.orange
  }
});

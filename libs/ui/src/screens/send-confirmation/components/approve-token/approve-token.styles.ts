import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  permission: {
    marginTop: getCustomSize(2),
    marginBottom: getCustomSize(3.75)
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  fieldTitle: {
    ...typography.captionInterRegular11,
    color: colors.textGrey3
  },
  icon: {
    marginLeft: getCustomSize()
  },
  divider: {
    backgroundColor: colors.bgGrey3,
    width: '100%',
    height: getCustomSize(0.0625),
    marginTop: getCustomSize(1.46875),
    marginBottom: getCustomSize(1.53125)
  },
  transactionSpeed: {
    marginVertical: getCustomSize()
  }
});

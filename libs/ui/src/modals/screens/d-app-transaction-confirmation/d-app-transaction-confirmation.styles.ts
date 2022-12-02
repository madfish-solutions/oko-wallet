import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  allowanceBlock: {
    width: '100%',
    backgroundColor: colors.bgGrey2,
    borderRadius: getCustomSize(1.75),
    padding: getCustomSize(1.5),
    marginBottom: getCustomSize(2.125)
  },
  mainText: {
    ...typography.captionInterSemiBold13,
    color: colors.textGrey1,
    marginBottom: getCustomSize()
  },
  text: {
    ...typography.captionInterRegular13,
    color: colors.textGrey3
  }
});

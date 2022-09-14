import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    marginLeft: getCustomSize(0.5),
    ...typography.captionInterSemiBold13,
    color: colors.textGrey2
  },
  children: {
    marginTop: getCustomSize()
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  icon: {
    marginTop: getCustomSize()
  },
  link: {
    ...typography.captionInterSemiBold13,
    color: colors.orange,
    marginVertical: getCustomSize(2.375)
  },
  label: {
    ...typography.bodyInterSemiBold17
  },
  text: {
    ...typography.captionInterRegular13,
    color: colors.textGrey4,
    marginTop: getCustomSize(2),
    paddingHorizontal: getCustomSize(3),
    textAlign: 'center'
  }
});

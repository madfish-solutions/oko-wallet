import { StyleSheet } from 'react-native';

import { colors } from '../../../../../styles/colors';
import { getCustomSize } from '../../../../../styles/format-size';
import { typography } from '../../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    marginLeft: getCustomSize(2.5)
  },
  square: {
    position: 'absolute',
    left: -getCustomSize(2.5),
    bottom: getCustomSize(1.8125),
    width: getCustomSize(),
    height: getCustomSize(),
    backgroundColor: colors.textGrey6,
    borderRadius: getCustomSize(0.25)
  },
  part: {
    ...typography.captionInterSemiBold13,
    color: colors.textGrey3,
    marginBottom: getCustomSize(1.25)
  },
  route: {
    backgroundColor: colors.bgGrey4,
    borderRadius: getCustomSize(),
    padding: getCustomSize(),
    marginBottom: getCustomSize()
  }
});

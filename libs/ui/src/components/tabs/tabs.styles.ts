import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    position: 'relative',
    borderBottomWidth: getCustomSize(0.0625),
    borderColor: colors.border2
  },
  element: {
    paddingBottom: getCustomSize()
  },
  text: {
    ...typography.bodyInterRegular15
  },
  active: {
    color: colors.orange
  },
  border: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderBottomWidth: getCustomSize(0.5),
    borderTopLeftRadius: getCustomSize(0.5),
    borderTopRightRadius: getCustomSize(0.5),
    borderColor: colors.orange
  },
  divider: {
    width: getCustomSize(3.75)
  },
  component: {
    marginTop: getCustomSize(),
    marginHorizontal: getCustomSize(2)
  }
});

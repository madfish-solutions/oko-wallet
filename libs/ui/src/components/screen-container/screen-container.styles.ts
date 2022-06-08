import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';

export const ScreenContainerStyles = StyleSheet.create({
  root: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: colors.bgGrey1,
    paddingLeft: getCustomSize(3),
    paddingRight: getCustomSize(3)
  }
});

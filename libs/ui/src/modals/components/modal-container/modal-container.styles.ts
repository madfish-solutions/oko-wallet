import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { isWeb, isMobile } from '../../../utils/platform.utils';

const childrenHeight = `calc(100vh - ${getCustomSize(10.0625)}px)`;

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.navGrey1
  },
  children: {
    backgroundColor: colors.navGrey1,
    paddingHorizontal: getCustomSize(2),

    ...(isMobile && { flex: 1 }),
    ...(isWeb && { height: childrenHeight })
  }
});

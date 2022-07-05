import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { isWeb, isMobile } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.navGrey1
  },
  children: {
    backgroundColor: colors.navGrey1,

    ...(isMobile && { flex: 1 }),
    ...(isWeb && { height: '100vh' })
  }
});

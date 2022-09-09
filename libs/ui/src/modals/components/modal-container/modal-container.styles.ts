import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { checkActiveApplicationSession } from '../../../utils/check-active-application-session.util';
import { isWeb, isMobile } from '../../../utils/platform.utils';

const { isMaximiseScreenOpened } = checkActiveApplicationSession();

const childrenHeight = `calc(100vh - ${getCustomSize(10)}px)`;

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.navGrey1
  },
  children: {
    backgroundColor: colors.navGrey1,
    borderTopWidth: getCustomSize(0.0625),
    borderTopColor: colors.border2,

    ...(isMobile && { flex: 1 }),
    ...(isWeb && { height: childrenHeight }),
    ...(isMaximiseScreenOpened && { borderWidth: getCustomSize(0.125), borderColor: colors.bgGrey2, borderTopWidth: 0 })
  }
});

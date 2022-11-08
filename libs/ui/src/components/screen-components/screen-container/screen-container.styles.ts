import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { EXTENSION_FULL_SIZE } from '../../../styles/format-size';
import { isMaximiseScreen } from '../../../utils/check-active-application-session.util';
import { isMobile } from '../../../utils/platform.utils';
import { extensionHeight, maximiseViewStyles } from '../../navigator/utils/maximise-view-options';

export const styles = StyleSheet.create({
  root: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    height: isMobile ? '100%' : isMaximiseScreen ? extensionHeight : EXTENSION_FULL_SIZE,
    backgroundColor: colors.navGrey1,
    ...(isMaximiseScreen && {
      marginTop: maximiseViewStyles.marginTop,
      borderRadius: maximiseViewStyles.borderRadius,
      overflow: maximiseViewStyles.overflow
    })
  }
});

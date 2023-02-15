import { StyleSheet } from 'react-native';
import { isMobile } from 'shared/utils/platform.utils';

import { colors } from '../../../styles/colors';
import { EXTENSION_FULL_SIZE } from '../../../styles/format-size';
import { isFullpage } from '../../../utils/location.utils';
import { extensionHeight, maximiseViewStyles } from '../../navigator/utils/maximise-view-options';

export const styles = StyleSheet.create({
  root: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    height: isMobile ? '100%' : isFullpage ? extensionHeight : EXTENSION_FULL_SIZE,
    ...(isFullpage && {
      marginTop: maximiseViewStyles.marginTop,
      borderRadius: maximiseViewStyles.borderRadius,
      overflow: maximiseViewStyles.overflow
    })
  },
  primary: {
    backgroundColor: colors.navGrey1
  },
  secondary: {
    backgroundColor: colors.black
  }
});

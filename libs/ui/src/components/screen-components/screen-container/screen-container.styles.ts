import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { EXTENSION_FULL_SIZE } from '../../../styles/format-size';
import { checkActiveApplicationSession } from '../../../utils/check-active-application-session.util';
import { isWeb } from '../../../utils/platform.utils';
import { extensionHeight, maximiseViewStyles } from '../../navigator/utils/maximise-view-options';

const { isMaximiseScreenOpened } = checkActiveApplicationSession();

export const styles = StyleSheet.create({
  root: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    height: isWeb && !isMaximiseScreenOpened ? EXTENSION_FULL_SIZE : isMaximiseScreenOpened ? extensionHeight : '100%',
    backgroundColor: colors.navGrey1,
    ...(isMaximiseScreenOpened && {
      marginTop: maximiseViewStyles.marginTop,
      borderRadius: maximiseViewStyles.borderRadius,
      overflow: maximiseViewStyles.overflow
    })
  }
});

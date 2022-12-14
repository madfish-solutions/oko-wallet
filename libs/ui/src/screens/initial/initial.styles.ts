import { StyleSheet } from 'react-native';

import { extensionHeight, maximiseViewStyles } from '../../components/navigator/utils/maximise-view-options';
import { colors } from '../../styles/colors';
import { EXTENSION_FULL_SIZE, getCustomSize } from '../../styles/format-size';
import { isFullpage } from '../../utils/location.utils';
import { isMobile } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    height: isMobile ? '100%' : isFullpage ? extensionHeight : EXTENSION_FULL_SIZE,
    justifyContent: 'space-between',
    backgroundColor: colors.bgGrey1,
    ...(isFullpage && {
      marginTop: maximiseViewStyles.marginTop
    })
  },
  logoContainer: {
    backgroundColor: colors.bgGrey1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginTop: getCustomSize(2)
  },
  bottomBlock: {
    backgroundColor: colors.navGrey1,
    paddingHorizontal: getCustomSize(2),
    borderTopLeftRadius: getCustomSize(2),
    borderTopRightRadius: getCustomSize(2)
  },
  madLogo: {
    marginBottom: getCustomSize(4.25),
    marginTop: getCustomSize(5)
  }
});

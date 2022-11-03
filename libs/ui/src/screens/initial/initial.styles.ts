import { StyleSheet } from 'react-native';

import { extensionHeight, maximiseViewStyles } from '../../components/navigator/utils/maximise-view-options';
import { colors } from '../../styles/colors';
import { EXTENSION_FULL_SIZE, getCustomSize } from '../../styles/format-size';
import { isMaximiseScreen, isMobile } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    height: isMobile ? '100%' : isMaximiseScreen ? extensionHeight : EXTENSION_FULL_SIZE,
    justifyContent: 'space-between',
    backgroundColor: colors.bgGrey1,
    ...(isMaximiseScreen && {
      marginTop: maximiseViewStyles.marginTop
    })
  },
  logoContainer: {
    backgroundColor: colors.bgGrey1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: getCustomSize(10.5),
    width: getCustomSize(10.5),
    borderRadius: getCustomSize(2),
    backgroundColor: colors.bgGrey1
  },
  icon: {
    margin: getCustomSize()
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

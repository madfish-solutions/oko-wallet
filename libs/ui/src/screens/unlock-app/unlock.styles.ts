import { StyleSheet } from 'react-native';

import { extensionHeight } from '../../components/navigator/utils/maximise-view-options';
import { colors } from '../../styles/colors';
import { EXTENSION_FULL_SIZE, getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';
import { isMaximiseScreen, isMobile } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    height: isMobile ? '100%' : isMaximiseScreen ? extensionHeight : EXTENSION_FULL_SIZE,
    justifyContent: 'space-between'
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
    marginBottom: getCustomSize(2)
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
  },
  eyeIcon: {
    position: 'absolute',
    top: getCustomSize(1.25),
    right: getCustomSize()
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    borderTopLeftRadius: getCustomSize(2),
    borderTopRightRadius: getCustomSize(2),
    paddingTop: getCustomSize(2.125),
    marginBottom: getCustomSize(3.625)
  },
  input: {
    width: '100%'
  },
  clearIcon: {
    position: 'relative',
    right: getCustomSize(4)
  },
  textContainer: {
    justifyContent: 'center'
  },
  commonText: {
    ...typography.captionInterSemiBold11,
    color: colors.textGrey2
  },
  linkText: {
    ...typography.captionInterSemiBold11,
    color: colors.orange,
    textDecorationLine: 'underline'
  }
});

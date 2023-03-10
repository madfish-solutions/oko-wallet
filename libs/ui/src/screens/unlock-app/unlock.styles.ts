import { StyleSheet } from 'react-native';
import { isMobile } from 'shared';

import { extensionHeight, maximiseViewStyles } from '../../components/navigator/utils/maximise-view-options';
import { colors } from '../../styles/colors';
import { EXTENSION_FULL_SIZE, getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';
import { isFullpage } from '../../utils/location.utils';

export const styles = StyleSheet.create({
  root: {
    height: isMobile ? '100%' : isFullpage ? extensionHeight : EXTENSION_FULL_SIZE,
    justifyContent: 'space-between',
    backgroundColor: colors.bgGrey1,
    ...(isFullpage && {
      marginTop: maximiseViewStyles.marginTop,
      borderRadius: maximiseViewStyles.borderRadius
    })
  },
  logoContainer: {
    backgroundColor: colors.bgGrey1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...(isFullpage && {
      borderRadius: maximiseViewStyles.borderRadius
    })
  },
  bottomBlock: {
    backgroundColor: colors.navGrey1,
    paddingHorizontal: getCustomSize(2),
    borderTopLeftRadius: getCustomSize(2),
    borderTopRightRadius: getCustomSize(2),
    ...(isFullpage && {
      borderRadius: maximiseViewStyles.borderRadius
    })
  },
  password: {
    position: 'relative',
    width: '100%'
  },
  inputContainer: {
    position: 'relative',
    flex: 1,
    borderTopLeftRadius: getCustomSize(2),
    borderTopRightRadius: getCustomSize(2),
    paddingTop: getCustomSize(2.125),
    marginBottom: getCustomSize(3.625)
  },
  iconContainer: {
    backgroundColor: colors.bgGrey4,
    alignSelf: 'flex-end',
    marginBottom: getCustomSize(3.625),
    borderRadius: getCustomSize(),
    marginLeft: getCustomSize()
  },
  icon: {
    margin: getCustomSize()
  },
  button: {
    marginBottom: getCustomSize(2)
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
    textDecorationLine: 'underline',
    marginLeft: getCustomSize(0.5)
  },
  madLogo: {
    marginBottom: getCustomSize(4.25),
    marginTop: getCustomSize(5)
  }
});

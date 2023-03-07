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
  titleContainer: {
    marginTop: getCustomSize(5.5),
    marginBottom: getCustomSize(1.5)
  },
  oko: {
    ...typography.headlineInterBold34,
    color: colors.orange,
    marginRight: getCustomSize()
  },
  wallet: {
    ...typography.headlineInterBold34,
    color: colors.white
  },
  description: {
    ...typography.bodyInterRegular15,
    color: colors.textGrey2
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
  button: {
    marginTop: getCustomSize(2)
  },
  madLogo: {
    marginBottom: getCustomSize(4.25),
    marginTop: getCustomSize(5)
  }
});

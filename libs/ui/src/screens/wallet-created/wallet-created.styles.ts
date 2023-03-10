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
  topBlock: {
    backgroundColor: colors.bgGrey1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...(isFullpage && {
      borderRadius: maximiseViewStyles.borderRadius
    })
  },
  title: {
    ...typography.headlineInterBold28,
    marginRight: getCustomSize()
  },
  description: {
    ...typography.bodyInterRegular15,
    color: colors.textGrey2
  },
  bottomBlock: {
    backgroundColor: colors.navGrey1,
    paddingHorizontal: getCustomSize(2),
    paddingTop: getCustomSize(2),
    paddingBottom: getCustomSize(isMobile ? 4 : 2),
    borderTopLeftRadius: getCustomSize(2),
    borderTopRightRadius: getCustomSize(2),
    ...(isFullpage && {
      borderRadius: maximiseViewStyles.borderRadius
    })
  },
  row: {
    backgroundColor: colors.bgGrey2,
    borderRadius: getCustomSize(1.75),
    paddingVertical: getCustomSize(1.5),
    paddingHorizontal: getCustomSize(1.5)
  },
  analytics: {
    marginBottom: getCustomSize(2)
  },
  acceptTerms: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    ...typography.bodyInterSemiBold15,
    marginLeft: getCustomSize(0.5)
  },
  button: {
    marginTop: getCustomSize(4)
  }
});

import { StyleSheet } from 'react-native';
import { isWeb, isMobile } from 'shared';

import { maximiseViewStyles } from '../../../components/navigator/utils/maximise-view-options';
import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { isFullpage } from '../../../utils/location.utils';

const childrenHeight = `calc(100vh - ${getCustomSize(10)}px)`;
const modalHeaderTitleHeight = getCustomSize(10);

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
    ...(isFullpage && {
      height: maximiseViewStyles.height - modalHeaderTitleHeight,
      overflow: maximiseViewStyles.overflow,
      borderBottomLeftRadius: maximiseViewStyles.borderRadius,
      borderBottomRightRadius: maximiseViewStyles.borderRadius
    })
  }
});

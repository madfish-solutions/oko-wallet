import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';
import { isFullpage } from '../../../../utils/location.utils';
import { maximiseViewStyles } from '../../utils/maximise-view-options';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.bgGrey2,
    ...(isFullpage && {
      marginTop: maximiseViewStyles.marginTop,
      borderRadius: maximiseViewStyles.borderRadius
    })
  },
  backgroundSpace: {
    height: getCustomSize(3)
  },
  container: {
    justifyContent: 'center',
    backgroundColor: colors.navGrey1,
    borderTopLeftRadius: getCustomSize(1.75),
    borderTopRightRadius: getCustomSize(1.75),
    padding: getCustomSize(2)
  },
  title: {
    color: colors.textGrey1,
    marginLeft: 'auto',
    textAlign: 'center',
    ...typography.bodyInterRegular15
  },
  closeButton: {
    marginLeft: 'auto'
  }
});

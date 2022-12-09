import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { isWeb } from '../../../../utils/platform.utils';
import { maximiseViewStyles } from '../../../navigator/utils/maximise-view-options';

export const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgGrey1,
    opacity: 0.5,
    zIndex: 10,
    ...(isWeb && maximiseViewStyles)
  },
  loader: {
    backgroundColor: colors.bgGrey2,
    borderRadius: getCustomSize(1.75),
    padding: getCustomSize(2)
  }
});

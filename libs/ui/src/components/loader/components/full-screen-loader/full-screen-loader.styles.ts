import { StyleSheet } from 'react-native';
import { isWeb } from 'shared';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { maximiseViewStyles } from '../../../navigator/utils/maximise-view-options';

export const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
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

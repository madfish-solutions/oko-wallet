import { StyleSheet } from 'react-native';

import { maximiseViewStyles } from '../../components/navigator/utils/maximise-view-options';
import { colors } from '../../styles/colors';
import { EXTENSION_FULL_SIZE } from '../../styles/format-size';
import { isMaximiseScreen, isWeb } from '../../utils/platform.utils';

export const UnlockStyles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.navGrey1,
    height: isWeb ? EXTENSION_FULL_SIZE : '100%',
    ...(isMaximiseScreen && maximiseViewStyles)
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  text: {
    fontSize: 24,
    fontWeight: '700'
  }
});

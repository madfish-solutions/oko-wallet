import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { EXTENSION_FULL_SIZE } from '../../styles/format-size';
import { isWeb } from '../../utils/platform.utils';

export const UnlockStyles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.bgGrey2,
    height: isWeb ? EXTENSION_FULL_SIZE : '100%'
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

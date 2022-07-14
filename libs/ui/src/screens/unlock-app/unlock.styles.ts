import { StyleSheet } from 'react-native';

import { EXTENSION_FULL_SIZE } from '../../styles/format-size';
import { isWeb } from '../../utils/platform.utils';

export const UnlockStyles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  text: {
    fontSize: 24,
    fontWeight: '700'
  },
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFF',
    height: isWeb ? EXTENSION_FULL_SIZE : '100%'
  }
});

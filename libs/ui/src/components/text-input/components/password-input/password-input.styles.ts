import { StyleSheet } from 'react-native';
import { isWeb } from 'shared';

import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    position: 'relative',
    width: '100%'
  },
  container: {
    width: '100%'
  },
  input: {
    width: isWeb ? '80%' : '82%'
  },
  clearIcon: {
    position: 'relative',
    right: getCustomSize(4)
  },
  label: {
    marginBottom: getCustomSize(1.25)
  },
  eyeIcon: {
    position: 'absolute',
    top: getCustomSize(1.5),
    right: getCustomSize()
  }
});

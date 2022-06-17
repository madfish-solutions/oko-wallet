import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../styles/format-size';
import { isWeb } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    height: isWeb ? '100vh' : '100%'
  },
  content: {
    paddingHorizontal: getCustomSize(2)
  }
});

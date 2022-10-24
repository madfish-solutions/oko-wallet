import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../styles/format-size';
import { isWeb } from '../../../utils/platform.utils';

export const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  content: {
    flex: 1,
    height: '100%',
    paddingBottom: isWeb ? getCustomSize(2) : getCustomSize(4)
  }
});

import { StyleSheet } from 'react-native';
import { isWeb } from 'shared';

import { getCustomSize } from '../../../styles/format-size';

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

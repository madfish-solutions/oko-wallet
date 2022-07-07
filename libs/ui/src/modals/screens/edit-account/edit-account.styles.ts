import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../styles/format-size';
import { isWeb } from '../../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: getCustomSize(2),
    paddingHorizontal: getCustomSize(2),
    paddingBottom: getCustomSize(4),
    justifyContent: 'space-between',
    ...(isWeb && { paddingBottom: getCustomSize(12) })
  },
  content: {
    flex: 1
  },
  cancelButton: {
    marginRight: getCustomSize(3)
  }
});

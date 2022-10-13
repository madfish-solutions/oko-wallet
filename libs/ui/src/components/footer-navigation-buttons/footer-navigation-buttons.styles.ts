import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../styles/format-size';
import { isWeb } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingTop: getCustomSize(2),
    paddingHorizontal: getCustomSize(2),
    paddingBottom: isWeb ? getCustomSize(2) : getCustomSize(4)
  },
  cancelButton: {
    marginRight: getCustomSize(2)
  },
  button: {
    flex: 1
  }
});

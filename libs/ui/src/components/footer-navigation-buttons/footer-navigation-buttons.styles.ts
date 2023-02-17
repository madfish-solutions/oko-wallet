import { StyleSheet } from 'react-native';
import { isWeb } from 'shared';

import { getCustomSize } from '../../styles/format-size';

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

import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    zIndex: 0,
    left: getCustomSize(0.4),
    marginTop: getCustomSize(1.5)
  }
});

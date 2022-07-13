import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  qrCodeWrapper: {
    padding: getCustomSize(2),
    borderBottomLeftRadius: getCustomSize(3),
    borderBottomRightRadius: getCustomSize(3),
    zIndex: -1
  }
});

import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    height: getCustomSize(6),
    padding: getCustomSize(1.5),
    justifyContent: 'space-between'
  }
});

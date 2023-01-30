import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    marginBottom: getCustomSize(2)
  },
  widgetContainer: {
    borderRadius: getCustomSize(1.75),
    overflow: 'hidden'
  }
});

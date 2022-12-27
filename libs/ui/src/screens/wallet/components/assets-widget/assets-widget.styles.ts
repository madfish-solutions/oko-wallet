import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  widgetStyles: {
    marginBottom: getCustomSize(3)
  },
  root: {
    borderRadius: getCustomSize(1.75),
    overflow: 'hidden'
  }
});

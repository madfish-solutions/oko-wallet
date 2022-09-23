import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  layoutContainer: {
    position: 'relative'
  },
  layoutIcon: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    position: 'absolute',
    maxHeight: getCustomSize(37.5),
    maxWidth: getCustomSize(37.5),
    padding: '5.5%',
    width: '100%',
    height: '100%'
  }
});

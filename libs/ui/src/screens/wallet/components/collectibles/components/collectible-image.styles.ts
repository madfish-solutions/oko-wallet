import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: getCustomSize(0.5),
    justifyContent: 'center'
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getCustomSize(0.5)
  }
});

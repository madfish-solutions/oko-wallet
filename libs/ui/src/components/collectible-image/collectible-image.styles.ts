import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: getCustomSize(0.5),
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  pixelShitIcon: {
    position: 'absolute'
  },
  layout: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getCustomSize(0.5)
  }
});

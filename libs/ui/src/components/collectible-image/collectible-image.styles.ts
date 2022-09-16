import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
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
    borderRadius: getCustomSize(0.5),
    overflow: 'hidden',
    backgroundColor: colors.bgGrey2
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getCustomSize(0.5)
  }
});

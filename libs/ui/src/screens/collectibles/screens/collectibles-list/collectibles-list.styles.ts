import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { IMAGE_CONTAINER_SIZE, IMAGE_SIZE } from '../../constants';

export const styles = StyleSheet.create({
  layoutContainer: {
    width: IMAGE_CONTAINER_SIZE,
    height: IMAGE_CONTAINER_SIZE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  layout: {
    width: IMAGE_SIZE,
    height: getCustomSize(17.5),
    backgroundColor: colors.bgGrey2,
    borderRadius: getCustomSize(0.5)
  },
  imageContainer: {
    position: 'absolute'
  },
  image: {
    backgroundColor: 'transparent'
  }
});

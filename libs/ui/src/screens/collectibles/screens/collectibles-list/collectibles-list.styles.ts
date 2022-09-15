import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { IMAGE_SIZE } from '../../constants';

export const styles = StyleSheet.create({
  blockLayout: {
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

import { StyleSheet } from 'react-native';

import { colors } from '../../../../../styles/colors';
import { getCustomSize } from '../../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  layout: {
    position: 'absolute',
    backgroundColor: colors.navGrey1,
    justifyContent: 'center'
  },
  image: {
    borderRadius: getCustomSize(0.5)
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  pixelShitIcon: {
    position: 'absolute'
  }
});

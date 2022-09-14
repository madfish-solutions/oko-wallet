import { StyleSheet } from 'react-native';

import { colors } from '../../../../../styles/colors';
import { getCustomSize } from '../../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    borderRadius: getCustomSize(0.5),
    backgroundColor: colors.navGrey1,
    justifyContent: 'center'
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

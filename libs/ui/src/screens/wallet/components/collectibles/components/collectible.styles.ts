import { StyleSheet } from 'react-native';

import { colors } from '../../../../../styles/colors';
import { getCustomSize } from '../../../../../styles/format-size';

export const styles = StyleSheet.create({
  image: {
    height: 98,
    width: 98,
    borderRadius: getCustomSize(0.5),
    backgroundColor: colors.navGrey1,
    justifyContent: 'center'
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

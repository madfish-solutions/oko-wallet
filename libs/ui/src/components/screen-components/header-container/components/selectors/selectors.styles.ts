import { StyleSheet } from 'react-native';

import { colors } from '../../../../../styles/colors';
import { getCustomSize } from '../../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between'
  },
  button: {
    padding: getCustomSize(0.5),
    backgroundColor: colors.navGrey1,
    borderRadius: getCustomSize(1.75)
  },
  addressWrapper: {
    marginLeft: 'auto',
    marginRight: getCustomSize()
  },
  icon: {
    marginRight: getCustomSize(0.5)
  }
});

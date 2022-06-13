import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';

export const TouchableElementStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: getCustomSize(0.5),
    backgroundColor: colors.navGrey1,
    borderRadius: getCustomSize(1.75)
  },
  paddingRight: {
    paddingRight: getCustomSize(1.5)
  },
  text: {
    marginLeft: getCustomSize(0.5),
    fontSize: getCustomSize(1.375),
    color: colors.textGrey1
  }
});

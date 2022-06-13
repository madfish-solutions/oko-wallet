import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: getCustomSize(0.5),
    color: colors.orange
  },
  address: {
    width: getCustomSize(10),
    fontSize: getCustomSize(1.625),
    color: colors.textGrey1
  }
});

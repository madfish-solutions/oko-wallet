import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    color: colors.orange
  },
  text: {
    fontSize: getCustomSize(3.5),
    fontWeight: '500',
    color: colors.textGrey1
  }
});

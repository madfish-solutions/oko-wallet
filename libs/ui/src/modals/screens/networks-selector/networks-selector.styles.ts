import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';

export const styles = StyleSheet.create({
  header: {
    paddingTop: getCustomSize(2),
    paddingBottom: getCustomSize()
  },
  divider: {
    backgroundColor: colors.bgGrey1,
    width: '100%'
  }
});

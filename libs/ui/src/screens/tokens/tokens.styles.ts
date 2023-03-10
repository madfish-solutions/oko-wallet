import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: colors.navGrey1
  },
  root: {
    flex: 1,
    paddingHorizontal: getCustomSize(2)
  },
  loader: {
    paddingTop: getCustomSize(2)
  }
});

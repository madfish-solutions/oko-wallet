import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';

export const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: getCustomSize(6.25),
    paddingBottom: getCustomSize(2.625),
    paddingHorizontal: getCustomSize(2),
    backgroundColor: colors.bgGrey2,
    borderBottomLeftRadius: getCustomSize(3),
    borderBottomRightRadius: getCustomSize(3)
  },
  content: {
    padding: getCustomSize(2)
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { isWeb } from '../../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: getCustomSize(2),
    ...(isWeb && { paddingBottom: getCustomSize(10) })
  },
  search: {
    justifyContent: 'space-between',
    height: getCustomSize(5),
    marginVertical: getCustomSize()
  },
  input: {
    height: getCustomSize(5),
    color: colors.textGrey1
  },
  close: {
    marginLeft: getCustomSize(2)
  }
});

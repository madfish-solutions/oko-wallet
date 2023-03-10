import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    width: '100%'
  },
  input: {
    flex: 1
  },
  iconContainer: {
    backgroundColor: colors.bgGrey4,
    alignSelf: 'flex-end',
    borderRadius: getCustomSize(),
    marginLeft: getCustomSize()
  },
  icon: {
    margin: getCustomSize()
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.bgGrey3,
    width: '100%',
    marginLeft: getCustomSize(2)
  }
});

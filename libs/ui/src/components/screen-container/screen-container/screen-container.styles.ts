import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { EXTENSION_FULL_SIZE, getCustomSize } from '../../../styles/format-size';
import { isWeb } from '../../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    position: 'relative',
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    height: isWeb ? EXTENSION_FULL_SIZE : '100%',
    backgroundColor: colors.bgGrey1,
    borderBottomLeftRadius: getCustomSize(3),
    borderBottomRightRadius: getCustomSize(3)
  },
  content: {
    padding: getCustomSize(2)
  }
});

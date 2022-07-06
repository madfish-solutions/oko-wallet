import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { isWeb } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    height: isWeb ? '100vh' : '100%',
    backgroundColor: colors.bgGrey1
  },
  content: {
    paddingVertical: getCustomSize(3.5),
    paddingHorizontal: getCustomSize(2)
  }
});

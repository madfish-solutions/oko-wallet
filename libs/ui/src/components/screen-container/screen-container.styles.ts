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
    backgroundColor: colors.navGrey1
  },
  content: {
    paddingHorizontal: getCustomSize(2)
  }
});

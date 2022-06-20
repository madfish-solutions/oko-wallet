import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { isWeb } from '../../utils/platform.utils';

export const ScreenContainerStyles = StyleSheet.create({
  root: {
    flexGrow: 1,
    flexShrink: 0,
    backgroundColor: colors.bgGrey1,
    paddingLeft: getCustomSize(3),
    paddingRight: getCustomSize(3),
    height: isWeb ? '100vh' : '100%',
    width: isWeb ? '100vw' : '100%'
  }
});

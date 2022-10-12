import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../styles/format-size';
import { isMobile, isWeb } from '../../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: getCustomSize(2),
    paddingBottom: getCustomSize(isMobile ? 4 : 2),
    justifyContent: 'space-between'
  },
  content: {
    flex: 1,
    marginBottom: getCustomSize(2),
    paddingHorizontal: getCustomSize(2),
    paddingRight: isWeb ? getCustomSize(1.5) : getCustomSize(2)
  }
});

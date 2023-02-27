import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../styles/format-size';
import { isMobile } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: getCustomSize(2)
  },
  button: {
    paddingBottom: getCustomSize(isMobile ? 4 : 2),
    paddingTop: getCustomSize(2)
  }
});

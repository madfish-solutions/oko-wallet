import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../styles/format-size';
import { isMobile } from '../../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: getCustomSize(2),
    paddingHorizontal: getCustomSize(2)
  },
  children: {
    flex: 1,
    marginBottom: getCustomSize(2)
  },
  button: {
    paddingHorizontal: getCustomSize(2),
    paddingBottom: getCustomSize(isMobile ? 4 : 2),
    paddingTop: getCustomSize(2)
  }
});

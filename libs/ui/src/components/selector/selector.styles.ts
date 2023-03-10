import { StyleSheet } from 'react-native';
import { isMobile } from 'shared';

import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: getCustomSize(2)
  },
  button: {
    paddingBottom: getCustomSize(isMobile ? 4 : 2)
  },
  loader: {
    paddingTop: getCustomSize(2)
  }
});

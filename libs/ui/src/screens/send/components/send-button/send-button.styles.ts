import { StyleSheet } from 'react-native';
import { isMobile } from 'shared';

import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    paddingHorizontal: getCustomSize(2),
    marginTop: getCustomSize(2),
    marginBottom: isMobile ? getCustomSize(4) : getCustomSize(2),
    height: getCustomSize(5)
  }
});

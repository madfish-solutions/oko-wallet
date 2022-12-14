import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';
import { isMobile } from '../../../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    paddingHorizontal: getCustomSize(2),
    marginTop: getCustomSize(2),
    marginBottom: isMobile ? getCustomSize(4) : getCustomSize(2),
    height: getCustomSize(5)
  }
});
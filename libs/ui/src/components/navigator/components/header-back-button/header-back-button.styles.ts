import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';
import { isMobile } from '../../../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    ...(isMobile && { paddingLeft: getCustomSize(2) })
  }
});

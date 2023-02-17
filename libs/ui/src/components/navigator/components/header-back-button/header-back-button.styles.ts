import { StyleSheet } from 'react-native';
import { isMobile } from 'shared';

import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    ...(isMobile && { paddingLeft: getCustomSize(2) })
  }
});

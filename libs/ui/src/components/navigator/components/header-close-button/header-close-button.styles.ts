import { StyleSheet } from 'react-native';
import { isMobile } from 'shared/utils/platform.utils';

import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    ...(isMobile && { paddingRight: getCustomSize(2) })
  }
});

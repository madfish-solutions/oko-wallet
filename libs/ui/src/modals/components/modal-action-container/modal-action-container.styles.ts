import { StyleSheet } from 'react-native';
import { isMobile } from 'shelter/utils/platform.utils';

import { getCustomSize } from '../../../styles/format-size';

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
    paddingHorizontal: getCustomSize(2)
  }
});

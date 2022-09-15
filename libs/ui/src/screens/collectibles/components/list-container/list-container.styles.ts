import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';
import { isMobile } from '../../../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    position: 'relative',
    width: '100%',
    flex: 1,
    paddingHorizontal: getCustomSize(2)
  },
  searchPanel: {
    marginBottom: getCustomSize(3)
  },
  flatList: {
    width: '100%'
  },
  contentContainerStyle: {
    alignItems: 'center'
  },
  columnWrapperStyle: {
    width: isMobile ? getCustomSize(42.875) : getCustomSize(41)
  }
});

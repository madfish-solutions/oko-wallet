import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../styles/format-size';
import { isMobile, isWeb } from '../../utils/platform.utils';

import { contentHeight } from './constants/dimensions';

export const styles = StyleSheet.create({
  container: {
    marginTop: getCustomSize(-7),
    ...(isWeb && { paddingTop: getCustomSize(7) })
  },
  contentContainer: {
    minHeight: contentHeight,
    flexShrink: 0,
    ...(isMobile && { paddingTop: getCustomSize(7) })
  },
  content: {
    marginTop: getCustomSize(-7),
    padding: getCustomSize(2),
    paddingRight: isWeb ? getCustomSize(1.5) : getCustomSize(2),
    paddingTop: getCustomSize(7),
    zIndex: -1
  }
});

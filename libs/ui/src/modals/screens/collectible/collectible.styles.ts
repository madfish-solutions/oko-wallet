import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../styles/format-size';
import { isMobile } from '../../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: getCustomSize(2),
    paddingBottom: isMobile ? getCustomSize(4) : getCustomSize(2),
    justifyContent: 'space-between'
  },
  content: {
    marginBottom: getCustomSize(2),
    paddingHorizontal: getCustomSize(2)
  },
  contentContainerStyle: {
    alignItems: 'center'
  },
  collectibleWrapper: {
    position: 'relative',
    marginBottom: getCustomSize(2)
  },
  imageContainer: {
    position: 'absolute',
    borderRadius: getCustomSize(0.5)
  },
  list: {
    width: '100%'
  },
  buttonContainer: {
    paddingHorizontal: getCustomSize(2)
  },
  button: {
    height: getCustomSize(5),
    flexGrow: 0
  }
});

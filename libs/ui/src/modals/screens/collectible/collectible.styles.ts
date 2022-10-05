import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../styles/format-size';
import { isMobile } from '../../../utils/platform.utils';
import { COLLECTIBLE_SIZE } from '../add-new-collectible/constants';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: getCustomSize(2),
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
    height: COLLECTIBLE_SIZE,
    width: COLLECTIBLE_SIZE,
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
    paddingHorizontal: getCustomSize(2),
    height: getCustomSize(5)
  }
});

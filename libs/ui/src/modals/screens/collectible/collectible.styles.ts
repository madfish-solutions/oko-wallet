import { StyleSheet } from 'react-native';
import { isWeb } from 'shared';

import { getCustomSize } from '../../../styles/format-size';

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
    width: '100%',
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
    marginBottom: isWeb ? getCustomSize(2) : getCustomSize(4),
    paddingHorizontal: getCustomSize(2),
    height: getCustomSize(5)
  }
});

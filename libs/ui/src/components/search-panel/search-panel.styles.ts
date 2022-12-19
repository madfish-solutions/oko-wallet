import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getCustomSize(2),
    width: '100%'
  },
  wrapper: {
    justifyContent: 'space-between',
    width: '100%'
  },
  searchWrapper: {
    width: '100%',
    marginTop: getCustomSize()
  },
  close: {
    marginLeft: getCustomSize(2)
  },
  inputContainer: {
    flex: 1
  },
  input: {
    height: getCustomSize(5)
  },
  iconsWrapper: {
    justifyContent: 'space-between',
    width: '100%',
    marginTop: getCustomSize(2)
  },
  extraIcon: {
    marginLeft: getCustomSize(2)
  },
  emptySearchIcon: {
    position: 'absolute',
    top: 0,
    zIndex: -1
  }
});

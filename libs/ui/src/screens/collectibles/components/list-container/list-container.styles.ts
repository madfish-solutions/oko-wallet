import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';

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
    width: '100%',
    flex: 1
  },
  columnWrapperStyle: {
    width: '100%',
    justifyContent: 'space-between'
  }
});

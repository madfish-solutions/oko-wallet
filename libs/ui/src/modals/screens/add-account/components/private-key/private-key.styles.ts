import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    paddingHorizontal: getCustomSize(2)
  },
  inputNameContainer: {
    width: '100%',
    marginBottom: getCustomSize(3.5)
  },
  buttons: {
    paddingTop: getCustomSize(2)
  }
});

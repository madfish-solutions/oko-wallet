import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    marginBottom: getCustomSize(1)
  },
  inputContainer: {
    marginBottom: getCustomSize(3.5)
  },
  tokenContainer: {
    marginBottom: getCustomSize(1.5)
  }
});

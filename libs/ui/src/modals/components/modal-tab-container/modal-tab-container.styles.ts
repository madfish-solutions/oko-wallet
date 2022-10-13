import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../styles/format-size';

export const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  content: {
    flex: 1,
    height: '100%',
    paddingTop: getCustomSize(2)
  }
});

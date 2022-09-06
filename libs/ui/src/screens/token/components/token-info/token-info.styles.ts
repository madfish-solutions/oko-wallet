import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    marginTop: getCustomSize(2),
    paddingHorizontal: getCustomSize(2),
    paddingBottom: getCustomSize(2.75)
  }
});

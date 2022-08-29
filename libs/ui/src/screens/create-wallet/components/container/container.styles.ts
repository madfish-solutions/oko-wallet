import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  title: {
    ...typography.bodyInterRegular17
  },
  root: {
    flex: 1,
    width: '100%',
    padding: getCustomSize(2)
  }
});

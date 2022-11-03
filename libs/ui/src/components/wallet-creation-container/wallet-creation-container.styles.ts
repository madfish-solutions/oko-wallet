import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  title: {
    ...typography.bodyInterRegular17
  },
  content: {
    flex: 1,
    width: '100%',
    marginTop: getCustomSize(2),
    paddingHorizontal: getCustomSize(2)
  }
});

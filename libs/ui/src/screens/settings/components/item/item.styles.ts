import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    height: getCustomSize(6),
    padding: getCustomSize(1.5)
  },
  content: {
    justifyContent: 'space-between'
  },
  title: {
    ...typography.bodyInterSemiBold15
  },
  icon: {
    marginRight: getCustomSize(0.5)
  }
});

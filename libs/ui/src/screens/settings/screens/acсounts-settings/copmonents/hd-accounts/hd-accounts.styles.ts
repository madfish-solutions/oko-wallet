import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../../../styles/format-size';
import { typography } from '../../../../../../styles/typography';

export const styles = StyleSheet.create({
  button: {
    height: getCustomSize(4)
  },
  buttonText: {
    ...typography.taglineInterSemiBoldUppercase13
  }
});

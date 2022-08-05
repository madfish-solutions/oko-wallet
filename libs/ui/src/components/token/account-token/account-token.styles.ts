import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  buttonContainer: {
    width: getCustomSize(11)
  },
  buttonText: {
    color: colors.green,
    ...typography.taglineInterSemiBoldUppercase13
  },
  redText: {
    color: colors.red
  }
});

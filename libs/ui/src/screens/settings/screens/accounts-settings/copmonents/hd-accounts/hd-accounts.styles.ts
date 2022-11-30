import { StyleSheet } from 'react-native';

import { colors } from '../../../../../../styles/colors';
import { typography } from '../../../../../../styles/typography';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.navGrey1
  },
  buttonText: {
    ...typography.taglineInterSemiBoldUppercase13
  }
});

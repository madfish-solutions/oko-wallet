import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  controllerOffset: {
    marginBottom: getCustomSize(3.5)
  },
  errorInput: {
    borderColor: colors.red
  },
  passwordValidationContainer: {
    marginTop: getCustomSize(0.5),
    marginBottom: getCustomSize(1.5)
  },
  passwordValidationText: {
    ...typography.captionInterRegular11,
    color: colors.textGrey5
  },
  valid: {
    color: colors.green
  },
  noValid: {
    color: colors.red
  },
  checkbox: {
    marginBottom: getCustomSize(3)
  }
});

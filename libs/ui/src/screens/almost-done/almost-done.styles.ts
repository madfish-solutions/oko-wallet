import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  controllerOffset: {
    marginBottom: getCustomSize(3.5)
  },
  passwordContainer: {
    marginBottom: getCustomSize(1.5)
  },
  inputContainer: {
    position: 'relative',
    width: '100%'
  },
  input: {
    width: '100%'
  },
  errorInput: {
    borderColor: colors.red
  },
  clearIcon: {
    position: 'relative',
    right: getCustomSize(4)
  },
  eyeIcon: {
    position: 'absolute',
    top: getCustomSize(1.25),
    right: getCustomSize()
  },
  passwordValidationContainer: {
    marginTop: getCustomSize(0.5)
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
  },
  text: {
    ...typography.captionInterSemiBold11,
    color: colors.textGrey2
  },
  link: {
    marginHorizontal: getCustomSize(0.25),
    borderBottomWidth: getCustomSize(0.125),
    borderBottomColor: colors.orange
  },
  linkingText: {
    ...typography.captionInterSemiBold11,
    color: colors.orange
  },
  error: {
    marginTop: getCustomSize(1.25),
    ...typography.captionInterRegular11,
    color: colors.red
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';
import { isMobile, isWeb } from '../../../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    paddingHorizontal: getCustomSize(2)
  },
  controllerOffset: {
    marginBottom: getCustomSize(3.5)
  },
  passwordContainer: {
    marginBottom: getCustomSize(1.5)
  },
  oldPasswordContainer: {
    marginBottom: getCustomSize(3.75),
    marginTop: getCustomSize(2.125)
  },
  inputWrapper: {
    position: 'relative',
    width: '100%'
  },
  inputContainer: {
    width: '100%'
  },
  input: {
    width: isWeb ? '80%' : '82%'
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
    color: colors.textGrey2
  },
  valid: {
    color: colors.green
  },
  noValid: {
    color: colors.red
  },
  label: {
    marginBottom: getCustomSize(1.25)
  },
  saveButtonContainer: {
    height: getCustomSize(5),
    marginTop: getCustomSize(2),
    marginBottom: isMobile ? getCustomSize(4) : getCustomSize(2),
    paddingHorizontal: getCustomSize(2)
  }
});

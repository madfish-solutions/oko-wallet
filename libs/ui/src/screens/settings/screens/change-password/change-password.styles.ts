import { StyleSheet } from 'react-native';
import { isMobile } from 'shared';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    paddingHorizontal: getCustomSize(2)
  },
  oldPasswordContainer: {
    marginBottom: getCustomSize(3.75),
    marginTop: getCustomSize(2.125)
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
    color: colors.textGrey2
  },
  valid: {
    color: colors.green
  },
  noValid: {
    color: colors.red
  },
  controllerOffset: {
    marginBottom: getCustomSize(3.5)
  },
  saveButtonContainer: {
    height: getCustomSize(5),
    marginTop: getCustomSize(2),
    marginBottom: isMobile ? getCustomSize(4) : getCustomSize(2),
    paddingHorizontal: getCustomSize(2)
  }
});

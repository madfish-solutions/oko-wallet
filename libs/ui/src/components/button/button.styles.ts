import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getCustomSize(1.75),
    borderWidth: getCustomSize(0.25)
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: colors.textGrey1
  },
  // primary
  buttonPrimary: {
    backgroundColor: 'transparent',
    borderColor: colors.bgGrey2
  },
  textPrimary: {
    color: colors.orange,
    ...typography.taglineInterSemiBoldUppercase15
  },
  // secondary
  buttonSecondary: {
    borderColor: 'transparent',
    backgroundColor: colors.orange
  },
  textSecondary: {
    color: colors.textGrey1,
    ...typography.taglineInterSemiBoldUppercase15
  },
  buttonTernary: {
    borderWidth: 0,
    backgroundColor: 'transparent'
  },
  textTernary: {
    color: colors.orange,
    ...typography.taglineInterSemiBoldUppercase11
  },
  // disabled
  disabledButton: {
    borderColor: 'transparent',
    backgroundColor: colors.bgGrey5
  },
  disabledText: {
    color: colors.textGrey2,
    ...typography.taglineInterSemiBoldUppercase15
  },
  // size
  fluid: {
    width: '100%'
  },
  auto: {
    width: 'auto',
    height: 'auto'
  },
  large: {
    height: getCustomSize(5)
  },
  medium: {
    height: getCustomSize(4)
  },
  small: {
    height: getCustomSize(3.25)
  }
});

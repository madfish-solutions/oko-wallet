import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexBasis: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: colors.textGrey1
  },
  buttonPrimary: {
    borderRadius: getCustomSize(0.5),
    color: colors.textGrey1,
    backgroundColor: colors.navGrey1,
    paddingVertical: getCustomSize(1.5)
  },
  textPrimary: {
    ...typography.taglineInterSemiBoldUppercase13
  },
  buttonSecondary: {
    borderRadius: getCustomSize(1.75),
    paddingVertical: getCustomSize(1.25),
    borderWidth: getCustomSize(0.25),
    backgroundColor: colors.navGrey1,
    borderColor: colors.bgGrey2
  },
  textSecondary: {
    color: colors.orange,
    ...typography.taglineInterSemiBoldUppercase15
  },
  buttonTertiary: {
    borderRadius: getCustomSize(1.75),
    paddingVertical: getCustomSize(1.25),
    borderWidth: getCustomSize(0.25),
    borderColor: 'transparent',
    backgroundColor: colors.orange
  },
  textTertiary: {
    color: colors.textGrey1,
    ...typography.taglineInterSemiBoldUppercase15
  },
  disabledButton: {
    borderRadius: getCustomSize(1.75),
    paddingVertical: getCustomSize(1.25),
    borderWidth: getCustomSize(0.25),
    borderColor: 'transparent',
    backgroundColor: colors.bgGrey5
  },
  disabledText: {
    color: colors.textGrey2,
    ...typography.taglineInterSemiBoldUppercase15
  },
  extraLarge: {
    height: getCustomSize(6)
  },
  large: {
    height: getCustomSize(5)
  },
  medium: {
    height: getCustomSize(4)
  },
  small: {
    height: getCustomSize(3.25)
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightIcon: {
    marginLeft: getCustomSize(0.5)
  },
  leftIcon: {
    marginRight: getCustomSize(0.5)
  }
});

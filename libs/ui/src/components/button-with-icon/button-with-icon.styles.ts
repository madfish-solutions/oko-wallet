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
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  // primary
  primary: {
    color: colors.orange
  },
  // secondary
  secondary: {
    color: colors.textGrey1
  },
  // tertiary
  containerTertiary: {
    paddingVertical: getCustomSize(1.5),
    borderRadius: getCustomSize(0.5),
    backgroundColor: colors.navGrey1
  },
  tertiary: {
    color: colors.textGrey1,
    ...typography.taglineInterSemiBoldUppercase13
  },
  // disabled
  buttonDisabled: {
    borderWidth: 0,
    backgroundColor: 'transparent'
  },
  textDisabled: {
    color: colors.bgGrey5
  },
  // size
  large: {
    ...typography.taglineInterSemiBoldUppercase15
  },
  medium: {
    ...typography.taglineInterSemiBoldUppercase13
  },
  small: {
    ...typography.taglineInterSemiBoldUppercase11
  },
  rightIcon: {
    marginLeft: getCustomSize(0.5)
  },
  leftIcon: {
    marginRight: getCustomSize(0.5)
  }
});

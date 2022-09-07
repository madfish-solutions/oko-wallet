import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';
import { isWeb } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colors.bgGrey4,
    borderWidth: 1,
    borderColor: colors.bgGrey4,
    borderRadius: getCustomSize(),
    paddingLeft: getCustomSize(1.5),
    paddingRight: getCustomSize(1.25)
  },
  errorContainer: {
    borderColor: colors.red
  },
  focusedContainer: {
    borderColor: colors.border2
  },
  innerContainer: {
    justifyContent: 'space-between'
  },
  input: {
    width: '94%',
    height: getCustomSize(5.75),
    color: colors.textGrey1,
    ...typography.bodyInterRegular15,
    ...(isWeb && { outlineStyle: 'none' }),
    ...(isWeb && { caretColor: colors.orange }),
    lineHeight: undefined,
    overflow: 'hidden'
  },
  textErrorContainer: {
    position: 'absolute',
    bottom: -getCustomSize(2.25)
  },
  textError: {
    color: colors.red,
    ...typography.captionInterRegular11
  }
});

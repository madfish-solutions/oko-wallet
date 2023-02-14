import { StyleSheet } from 'react-native';
import { isWeb } from 'shelter/src/utils/platform.utils';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colors.bgGrey4,
    borderWidth: getCustomSize(0.125),
    borderColor: colors.bgGrey4,
    borderRadius: getCustomSize(),
    paddingLeft: getCustomSize(1.5),
    paddingRight: getCustomSize()
  },
  errorContainer: {
    borderColor: colors.red
  },
  focusedContainer: {
    borderColor: colors.border2
  },
  innerContainer: {
    position: 'relative',
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
  }
});

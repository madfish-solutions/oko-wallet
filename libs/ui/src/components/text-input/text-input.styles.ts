import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';
import { isWeb } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  labelContainer: {
    justifyContent: 'space-between',
    marginBottom: getCustomSize(0.75)
  },
  label: {
    color: colors.textGrey3,
    ...typography.captionInterRegular13
  },
  optionalText: {
    color: colors.textGrey2,
    opacity: 0.5,
    ...typography.captionInterRegular11
  },
  promptContainer: {
    marginBottom: getCustomSize()
  },
  promptText: {
    marginRight: getCustomSize(0.5),
    color: colors.textGrey2,
    ...typography.captionInterRegular11
  },
  inputContainer: {
    position: 'relative'
  },
  input: {
    width: '100%',
    height: getCustomSize(6),
    paddingLeft: getCustomSize(1.5),
    paddingRight: getCustomSize(4.5),
    borderRadius: getCustomSize(),
    borderWidth: 1,
    backgroundColor: colors.bgGrey4,
    borderColor: colors.bgGrey4,
    color: colors.textGrey1,
    ...typography.bodyInterRegular15,
    ...(isWeb && { outlineStyle: 'none' }),
    ...(isWeb && { caretColor: colors.orange }),
    lineHeight: undefined
  },
  clearIcon: {
    position: 'absolute',
    right: getCustomSize()
  },
  errorInput: {
    borderColor: colors.red
  },
  errorContainer: {
    position: 'relative'
  },
  textError: {
    position: 'absolute',
    top: getCustomSize(0.75),
    color: colors.red,
    ...typography.captionInterRegular11
  }
});

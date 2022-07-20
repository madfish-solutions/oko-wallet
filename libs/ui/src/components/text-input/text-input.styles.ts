import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';
import { isWeb } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  labelContainer: {
    marginBottom: getCustomSize(0.75)
  },
  label: {
    color: colors.textGrey3,
    ...typography.captionInterRegular13
  },
  promptContainer: {
    marginBottom: getCustomSize()
  },
  promptText: {
    marginRight: getCustomSize(0.5),
    color: colors.textGrey2,
    ...typography.captionInterRegular11
  },
  input: {
    height: getCustomSize(6),
    paddingHorizontal: getCustomSize(1.5),
    borderRadius: getCustomSize(),
    borderWidth: 1,
    backgroundColor: colors.bgGrey4,
    borderColor: colors.bgGrey4,
    color: colors.textGrey1,
    ...typography.bodyInterRegular15,
    ...(isWeb && { outlineStyle: 'none' }),
    ...(isWeb && { caretColor: colors.orange })
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

import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';
import { isWeb } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  labelContainer: {
    paddingLeft: getCustomSize(),
    marginBottom: getCustomSize(0.75)
  },
  label: {
    color: colors.textGrey3,
    ...typography.captionInterRegular13
  },
  input: {
    height: getCustomSize(5),
    paddingHorizontal: getCustomSize(1.5),
    borderRadius: getCustomSize(),
    borderWidth: 1,
    backgroundColor: colors.bgGrey4,
    borderColor: colors.bgGrey4,
    color: colors.textGrey1,
    ...typography.bodyInterRegular15,
    ...(isWeb && { outlineStyle: 'none' })
  },
  errorInput: {
    borderColor: colors.red
  },
  textError: {
    marginTop: getCustomSize(),
    color: colors.red,
    ...typography.captionInterRegular11
  }
});

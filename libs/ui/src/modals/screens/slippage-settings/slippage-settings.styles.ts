import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  settings: {
    ...typography.captionInterRegular13,
    marginBottom: getCustomSize(1.25),
    color: colors.textGrey3
  },
  description: {
    ...typography.captionInterRegular11,
    color: colors.textGrey2
  },
  selectorBlock: {
    marginTop: getCustomSize(),
    marginBottom: getCustomSize(2)
  },
  inputContainer: {
    marginBottom: getCustomSize(3)
  }
});

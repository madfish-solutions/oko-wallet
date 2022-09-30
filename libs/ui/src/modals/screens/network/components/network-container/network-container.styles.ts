import { StyleSheet } from 'react-native';

import { colors } from '../../../../../styles/colors';
import { getCustomSize } from '../../../../../styles/format-size';
import { typography } from '../../../../../styles/typography';

export const styles = StyleSheet.create({
  prompt: {
    justifyContent: 'space-between',
    marginBottom: getCustomSize(2),
    paddingVertical: getCustomSize(1.25),
    paddingLeft: getCustomSize(1.5),
    paddingRight: getCustomSize(),
    backgroundColor: 'rgba(8, 14, 21, 0.24)',
    borderRadius: getCustomSize(1.75)
  },
  text: {
    color: colors.textGrey3,
    ...typography.captionInterRegular13
  },
  inputContainer: {
    marginBottom: getCustomSize(3.5)
  },
  lastInputContainer: {
    marginBottom: getCustomSize(2.25)
  }
});

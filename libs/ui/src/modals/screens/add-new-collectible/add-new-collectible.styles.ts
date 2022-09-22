import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    marginBottom: getCustomSize(1)
  },
  inputContainer: {
    marginBottom: getCustomSize(3.5)
  },
  lastInputContainer: {
    marginBottom: getCustomSize(4.75)
  },
  tokenContainer: {
    marginBottom: getCustomSize(1.5)
  },
  warning: {
    marginBottom: getCustomSize(2)
  },
  collectibleName: {
    marginBottom: getCustomSize(),
    ...typography.bodyInterRegular15
  },
  collectibleDescription: {
    marginBottom: getCustomSize(0.75),
    ...typography.captionInterRegular13,
    color: colors.textGrey3
  },
  image: {
    width: 300,
    height: 300
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../../../../../styles/colors';
import { typography } from '../../../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    opacity: 1
  },
  version: {
    ...typography.bodyInterRegular15,
    color: colors.textGrey3
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  title: {
    color: colors.textGrey1,
    ...typography.bodyInterRegular15
  }
});

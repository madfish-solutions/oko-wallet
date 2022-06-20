import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.bgGrey2,
    borderRadius: getCustomSize(2),
    paddingBottom: getCustomSize(0.25),
    paddingHorizontal: getCustomSize(0.25)
  },
  header: {
    justifyContent: 'flex-start',
    padding: getCustomSize(1),
    color: colors.border
  },
  text: {
    ...typography.bodyInterSemiBold15,
    lineHeight: 20,
    color: colors.textGrey1,
    marginLeft: getCustomSize(0.5),
    alignItems: 'center'
  }
});

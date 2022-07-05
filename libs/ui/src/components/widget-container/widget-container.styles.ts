import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.bgGrey2,
    borderRadius: getCustomSize(1.75),
    paddingBottom: getCustomSize(0.25),
    paddingHorizontal: getCustomSize(0.25)
  },
  header: {
    justifyContent: 'flex-start',
    padding: getCustomSize(1),
    color: colors.border1
  },
  text: {
    ...typography.bodyInterSemiBold15,
    color: colors.textGrey1,
    marginLeft: getCustomSize(0.5),
    alignItems: 'center'
  },
  children: {
    overflow: 'hidden',
    borderRadius: getCustomSize(1.75)
  }
});

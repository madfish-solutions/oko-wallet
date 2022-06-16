import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: getCustomSize(0.5),
    backgroundColor: colors.navGrey1,
    borderRadius: getCustomSize(1.75)
  },
  paddingRight: {
    paddingRight: getCustomSize(1.5)
  },
  text: {
    marginLeft: getCustomSize(0.5),
    color: colors.textGrey1,
    ...typography.captionInterSemiBold11,
    letterSpacing: getCustomSize(0.00875)
  },
  arrow: {
    marginLeft: getCustomSize(0.5)
  }
});

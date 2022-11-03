import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    paddingTop: getCustomSize()
  },
  iconContainer: {
    alignItems: 'center'
  },
  mainTextContainer: {
    marginVertical: getCustomSize(2),
    alignItems: 'center'
  },
  mainText: {
    ...typography.bodyInterSemiBold17,
    color: colors.textGrey4
  },
  resetTextContainer: {
    justifyContent: 'center',
    paddingHorizontal: getCustomSize()
  },
  resetText: {
    ...typography.captionInterRegular13,
    color: colors.textGrey3,
    textAlign: 'center'
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    paddingTop: getCustomSize(1.25),
    paddingHorizontal: getCustomSize(1.5),
    paddingBottom: getCustomSize(1.5),
    backgroundColor: colors.bgTransparentYellow,
    borderRadius: getCustomSize(1.75),
    overflow: 'hidden'
  },
  header: {
    width: '100%',
    justifyContent: 'space-between'
  },
  warningIcon: {
    marginRight: getCustomSize(0.5)
  },
  warningTitle: {
    ...typography.captionInterSemiBold13
  },
  content: {
    marginTop: getCustomSize()
  },
  warningMessage: {
    ...typography.captionInterRegular13,
    color: colors.textGrey3
  }
});

import { StyleSheet } from 'react-native';
import { isMobile } from 'shared';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: getCustomSize(2),
    paddingHorizontal: getCustomSize(2)
  },
  footer: {
    backgroundColor: colors.bgGrey2,
    borderTopLeftRadius: getCustomSize(1.75),
    borderTopRightRadius: getCustomSize(1.75),
    marginTop: getCustomSize(6),
    paddingTop: getCustomSize(2),
    paddingHorizontal: getCustomSize(isMobile ? 4 : 3),
    paddingBottom: getCustomSize(3)
  },
  walletNameContainer: {
    marginBottom: getCustomSize(3)
  },
  verticalSeparator: {
    backgroundColor: colors.bgGrey3,
    height: getCustomSize(8),
    marginHorizontal: getCustomSize()
  },
  walletText: {
    ...typography.captionInterSemiBold11,
    flex: 1,
    flexWrap: 'wrap',
    color: colors.textGrey3
  },
  redText: {
    color: colors.orange
  }
});

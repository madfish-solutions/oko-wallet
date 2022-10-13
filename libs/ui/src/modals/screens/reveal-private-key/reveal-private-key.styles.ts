import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    paddingTop: getCustomSize(2),
    paddingHorizontal: getCustomSize(2)
  },
  warning: {
    marginBottom: getCustomSize()
  },
  title: {
    marginBottom: getCustomSize(),
    color: colors.textGrey3,
    ...typography.captionInterRegular13
  },
  description: {
    marginBottom: getCustomSize(0.75),
    color: colors.textGrey2,
    ...typography.captionInterRegular11
  },
  wrapper: {
    position: 'relative',
    height: getCustomSize(14.75),
    paddingLeft: getCustomSize(1.5),
    paddingRight: getCustomSize(10),
    paddingVertical: getCustomSize(1.75),
    backgroundColor: colors.bgGrey4,
    borderRadius: getCustomSize(),
    overflow: 'hidden'
  },
  privateKey: {
    color: colors.textGrey3,
    ...typography.bodyInterRegular15
  },
  copy: {
    position: 'absolute',
    right: getCustomSize(1.5),
    bottom: getCustomSize(1.5)
  },
  copyText: {
    color: colors.orange,
    ...typography.taglineInterSemiBoldUppercase11
  }
});

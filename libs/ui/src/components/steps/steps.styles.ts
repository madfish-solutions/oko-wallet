import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  indicatorsText: {
    marginRight: getCustomSize(1.125),
    ...typography.captionInterSemiBold11,
    color: colors.textGrey2
  },
  indicators: {
    width: getCustomSize(5),
    backgroundColor: colors.bgGrey4,
    borderWidth: getCustomSize(0.125),
    borderColor: colors.border2,
    borderRadius: getCustomSize(0.5),
    overflow: 'hidden'
  },
  indicator: {
    height: getCustomSize(1.25),
    backgroundColor: colors.border1,
    borderRadius: getCustomSize(0.125)
  },
  indicatorOffset: {
    marginRight: getCustomSize(0.125)
  }
});

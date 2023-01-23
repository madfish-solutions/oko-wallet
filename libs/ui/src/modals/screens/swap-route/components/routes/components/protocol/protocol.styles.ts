import { StyleSheet } from 'react-native';

import { colors } from '../../../../../../../styles/colors';
import { getCustomSize } from '../../../../../../../styles/format-size';
import { typography } from '../../../../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    marginTop: getCustomSize()
  },
  image: {
    width: getCustomSize(3),
    height: getCustomSize(3),
    marginRight: getCustomSize(0.5),
    borderColor: colors.border2,
    borderWidth: getCustomSize(0.25),
    borderRadius: getCustomSize(6)
  },
  square: {
    width: getCustomSize(0.5),
    height: getCustomSize(0.5),
    backgroundColor: colors.textGrey6,
    marginTop: getCustomSize(),
    marginLeft: getCustomSize(1.25),
    borderRadius: getCustomSize(0.125)
  },
  circle: {
    width: getCustomSize(0.5),
    height: getCustomSize(0.5),
    backgroundColor: colors.textGrey6,
    marginLeft: getCustomSize(0.75),
    borderRadius: getCustomSize(0.25)
  },
  name: {
    ...typography.captionInterRegular11,
    color: colors.textGrey3
  }
});

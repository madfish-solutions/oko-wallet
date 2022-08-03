import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.green,
    paddingVertical: getCustomSize(0.5),
    paddingHorizontal: getCustomSize(2),
    marginTop: getCustomSize(),
    borderRadius: getCustomSize(),
    minWidth: getCustomSize(22.25),
    justifyContent: 'center'
  },
  rootSuccess: {
    backgroundColor: colors.green
  },
  rootWarning: {
    backgroundColor: colors.yellow
  },
  rootError: {
    backgroundColor: colors.red
  },
  icon: {
    marginRight: getCustomSize(0.5)
  },
  text: {
    ...typography.captionInterRegular13
  }
});

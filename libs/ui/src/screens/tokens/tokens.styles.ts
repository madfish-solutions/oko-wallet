import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';
import { isWeb } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: colors.navGrey1
  },
  root: {
    flex: 1,
    paddingHorizontal: getCustomSize(2),
    paddingRight: isWeb ? getCustomSize(1.5) : getCustomSize(2)
  },
  checkboxContainer: {
    marginBottom: getCustomSize(0.5)
  },
  checkboxText: {
    ...typography.captionInterSemiBold11,
    color: colors.textGrey2,
    marginLeft: getCustomSize(0.5)
  }
});

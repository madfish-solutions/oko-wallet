import { StyleSheet } from 'react-native';

import { colors } from '../../../../../styles/colors';
import { getCustomSize } from '../../../../../styles/format-size';
import { typography } from '../../../../../styles/typography';
import { isAndroid } from '../../../../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between'
  },
  accountContainer: {
    maxWidth: getCustomSize(isAndroid ? 21.5 : 19)
  },
  button: {
    padding: getCustomSize(0.5),
    backgroundColor: colors.navGrey1,
    borderRadius: getCustomSize(1.75)
  },
  accountName: {
    ...typography.captionInterSemiBold13,
    marginLeft: getCustomSize(0.5)
  },
  addressWrapper: {
    marginRight: getCustomSize()
  },
  icon: {
    marginRight: getCustomSize(0.5)
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';
import { isWeb } from '../../../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    position: 'relative',
    paddingHorizontal: getCustomSize(2),
    paddingBottom: getCustomSize(2.5),
    backgroundColor: colors.bgGrey2,
    borderBottomLeftRadius: getCustomSize(3),
    borderBottomRightRadius: getCustomSize(3),
    zIndex: 2
  },
  wrapper: {
    justifyContent: 'space-between',
    paddingBottom: getCustomSize(2),
    paddingTop: isWeb ? getCustomSize(2) : getCustomSize(5.5),
    backgroundColor: colors.bgGrey2
  },
  addressWrapper: {
    marginLeft: 'auto',
    marginRight: getCustomSize()
  },
  icon: {
    marginRight: getCustomSize(0.5)
  },
  address: {
    color: colors.textGrey1,
    ...typography.captionInterSemiBold13
  },
  button: {
    padding: getCustomSize(0.5),
    backgroundColor: colors.navGrey1,
    borderRadius: getCustomSize(1.75)
  }
});

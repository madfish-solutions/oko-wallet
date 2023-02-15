import { StyleSheet } from 'react-native';
import { isWeb } from 'shared/utils/platform.utils';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    position: 'relative',
    paddingTop: isWeb ? getCustomSize(2) : getCustomSize(5.5),
    paddingHorizontal: getCustomSize(2),
    paddingBottom: getCustomSize(2),
    backgroundColor: colors.bgGrey2,
    borderBottomLeftRadius: getCustomSize(3),
    borderBottomRightRadius: getCustomSize(3),
    zIndex: 2
  },
  paddingTop: {
    paddingTop: isWeb ? getCustomSize(0.375) : getCustomSize(4.625)
  },
  children: {
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
});

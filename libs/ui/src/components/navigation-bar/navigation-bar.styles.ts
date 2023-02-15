import { StyleSheet } from 'react-native';
import { isWeb } from 'shared/utils/platform.utils';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    paddingHorizontal: getCustomSize(2),
    paddingTop: getCustomSize(2),
    paddingBottom: getCustomSize(isWeb ? 2 : 4),
    backgroundColor: colors.navGrey1,
    borderTopLeftRadius: getCustomSize(1.75),
    borderTopRightRadius: getCustomSize(1.75)
  }
});

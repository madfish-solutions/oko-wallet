import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { isWeb } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    paddingHorizontal: getCustomSize(2),
    paddingTop: getCustomSize(2),
    paddingBottom: getCustomSize(isWeb ? 2 : 4),
    backgroundColor: colors.navGrey1,
    borderTopLeftRadius: getCustomSize(1.75),
    borderTopRightRadius: getCustomSize(1.75),
    marginTop: 'auto'
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-start'
  },
  divider: {
    width: '100%',
    height: getCustomSize(0.5),
    backgroundColor: colors.bgGrey1
  },
  tabs: {
    marginTop: getCustomSize(1.375),
    marginLeft: getCustomSize(2)
  }
});

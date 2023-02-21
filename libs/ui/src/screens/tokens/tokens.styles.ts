import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: colors.navGrey1
  },
  root: {
    flex: 1,
    paddingHorizontal: getCustomSize(2)
  },
  loading: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: getCustomSize(2)
  },
  container: {
    paddingVertical: 0
  },
  token: {
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: getCustomSize(2)
  },
  borderBottom: {
    borderBottomWidth: getCustomSize(0.125),
    borderBottomColor: colors.border2
  }
});

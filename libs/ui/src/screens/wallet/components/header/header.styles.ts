import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    paddingTop: getCustomSize(2.625),
    width: '100%'
  },
  icon: {
    marginRight: getCustomSize(2)
  },
  accountBalance: {
    marginLeft: 'auto'
  }
});

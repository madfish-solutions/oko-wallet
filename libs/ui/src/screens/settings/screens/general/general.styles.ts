import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  itemWithSwitch: {
    paddingRight: getCustomSize(1.75)
  },
  itemWithDropDown: {
    paddingVertical: getCustomSize(0.75),
    paddingRight: getCustomSize(0.75)
  }
});

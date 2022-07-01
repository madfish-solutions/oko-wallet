import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: getCustomSize(5),
    paddingVertical: getCustomSize(1),
    paddingHorizontal: getCustomSize(2.5),
    borderRadius: getCustomSize(1.75),
    borderWidth: getCustomSize(0.25),
    borderColor: colors.bgGrey2
  },
  lable: {
    color: colors.textGrey1
  }
});

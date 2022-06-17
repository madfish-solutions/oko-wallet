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
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24
  },
  icon: {
    color: colors.orange,
    fontSize: getCustomSize(2.5)
  },
  iconRight: {
    marginLeft: getCustomSize(0.5)
  },
  iconLeft: {
    marginRight: getCustomSize(0.5)
  },
  lable: {
    color: colors.textGrey1
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    marginTop: getCustomSize(),
    marginBottom: getCustomSize(1.5),
    marginHorizontal: getCustomSize(2)
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: getCustomSize(5),
    paddingVertical: getCustomSize(),
    borderRadius: getCustomSize(1.75),
    borderWidth: getCustomSize(0.25),
    borderColor: colors.bgGrey2
  },
  buttonDisabled: {
    borderColor: colors.bgGrey5
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.bgGrey2
  },
  backgroundSpace: {
    height: getCustomSize(3)
  },
  container: {
    justifyContent: 'center',
    backgroundColor: colors.navGrey1,
    borderTopLeftRadius: getCustomSize(1.75),
    borderTopRightRadius: getCustomSize(1.75),
    padding: getCustomSize(2),
    borderBottomWidth: getCustomSize(0.0625),
    borderBottomColor: colors.border2
  },
  title: {
    color: colors.textGrey1,
    marginLeft: 'auto',
    ...typography.bodyInterRegular15
  },
  closeButton: {
    marginLeft: 'auto'
  }
});

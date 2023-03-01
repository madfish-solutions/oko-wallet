import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    paddingTop: getCustomSize(2),
    paddingHorizontal: getCustomSize(2)
  },
  publicKeyHashContainer: {
    alignSelf: 'flex-end'
  },
  accountData: {
    marginBottom: getCustomSize(2.5)
  },
  item: {
    marginBottom: getCustomSize(2)
  },
  derivationPath: {
    marginRight: getCustomSize(2),
    ...typography.bodyInterSemiBold15,
    color: colors.textGrey3,
    lineHeight: undefined
  }
});

import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.bgGrey4,
    height: getCustomSize(12.25),
    paddingTop: getCustomSize(1.5),
    paddingBottom: getCustomSize(),
    paddingHorizontal: getCustomSize(1.5),
    borderRadius: getCustomSize()
  },
  wrapper: {
    justifyContent: 'space-between',
    marginBottom: getCustomSize(2.625)
  },
  icon: {
    borderRadius: getCustomSize(1.03125)
  },
  nameContainer: {
    maxWidth: getCustomSize(19),
    marginLeft: getCustomSize(0.5)
  },
  name: {
    ...typography.bodyInterSemiBold15
  },
  balance: {
    color: colors.textGrey2,
    ...typography.numbersIBMPlexSansRegular11
  }
});

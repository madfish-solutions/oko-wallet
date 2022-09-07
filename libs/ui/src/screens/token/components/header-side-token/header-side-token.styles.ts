import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    alignItems: 'flex-end'
  },
  wrapper: {
    marginBottom: getCustomSize(0.5)
  },
  amount: {
    marginRight: getCustomSize(0.5),
    color: colors.textGrey1,
    ...typography.numbersIBMPlexSansRegular11
  },
  tokenName: {
    marginRight: getCustomSize(0.5),
    color: colors.textGrey1,
    ...typography.captionInterRegular11
  },
  imageContainer: {
    backgroundColor: colors.navGrey1
  },
  image: {
    height: getCustomSize(4),
    width: getCustomSize(4)
  }
});

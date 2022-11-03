import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';
import { COLLECTIBLE_SIZE } from '../../constants';

export const styles = StyleSheet.create({
  amountWrapper: {
    alignItems: 'flex-end'
  },
  headerText: {
    marginBottom: getCustomSize(0.25),
    ...typography.captionInterRegular11,
    color: colors.textGrey2
  },
  amount: {
    ...typography.numbersIBMPlexSansMedium20
  },
  imageContainer: {
    position: 'absolute',
    maxHeight: COLLECTIBLE_SIZE,
    maxWidth: COLLECTIBLE_SIZE
  }
});

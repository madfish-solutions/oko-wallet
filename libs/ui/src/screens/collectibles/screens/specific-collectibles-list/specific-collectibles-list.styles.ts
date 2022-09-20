import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';
import { IMAGE_CONTAINER_SIZE } from '../../constants';

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
  blockLayout: {
    width: IMAGE_CONTAINER_SIZE,
    height: getCustomSize(20.5),
    backgroundColor: colors.bgGrey2,
    borderRadius: getCustomSize(0.5)
  },
  imageContainer: {
    position: 'absolute'
  },
  image: {
    backgroundColor: 'transparent'
  }
});

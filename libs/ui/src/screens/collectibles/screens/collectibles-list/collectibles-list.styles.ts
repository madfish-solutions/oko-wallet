import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';
import { COLLECTIBLE_SIZE } from '../../constants';

export const styles = StyleSheet.create({
  layoutContainer: {
    position: 'relative'
  },
  layoutIcon: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    position: 'absolute',
    maxHeight: COLLECTIBLE_SIZE,
    maxWidth: COLLECTIBLE_SIZE,
    padding: '5.5%',
    width: '100%',
    height: '100%'
  },
  collectionSize: {
    position: 'absolute',
    top: '7.5%',
    right: '7.5%',
    alignItems: 'center',
    justifyContent: 'center',
    height: getCustomSize(2),
    paddingHorizontal: getCustomSize(0.5),
    backgroundColor: colors.bgGrey4,
    borderRadius: getCustomSize(0.25)
  },
  collectionSizeText: {
    ...typography.numbersIBMPlexSansBold11
  }
});

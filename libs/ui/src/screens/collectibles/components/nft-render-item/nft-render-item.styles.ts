import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';
import { IMAGE_CONTAINER_SIZE } from '../../constants';

export const styles = StyleSheet.create({
  nft: {
    width: IMAGE_CONTAINER_SIZE,
    marginBottom: getCustomSize(2.5)
  },
  marginRight: {
    marginRight: getCustomSize(2)
  },
  imageWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: getCustomSize()
  },
  nftName: {
    ...typography.captionInterSemiBold13,
    textAlign: 'center'
  }
});

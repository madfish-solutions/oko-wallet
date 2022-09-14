import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';
import { isMobile } from '../../../../utils/platform.utils';
import { IMAGE_CONTAINER_SIZE, IMAGE_SIZE } from '../../constants';

export const styles = StyleSheet.create({
  root: {
    position: 'relative',
    width: '100%',
    flex: 1,
    paddingHorizontal: getCustomSize(2)
  },
  flatList: {
    width: '100%'
  },
  contentContainerStyle: {
    alignItems: 'center'
  },
  columnWrapperStyle: {
    width: isMobile ? getCustomSize(42.875) : getCustomSize(41)
  },
  nft: {
    width: IMAGE_CONTAINER_SIZE,
    marginBottom: getCustomSize(2.5)
  },
  imageWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: getCustomSize()
  },
  blockLayout: {
    width: IMAGE_SIZE,
    height: getCustomSize(17.5),
    backgroundColor: colors.bgGrey2,
    borderRadius: getCustomSize(0.5)
  },
  marginRight: {
    marginRight: getCustomSize(2)
  },
  imageContainer: {
    position: 'absolute'
  },
  image: {
    backgroundColor: 'transparent'
  },
  nftName: {
    ...typography.captionInterSemiBold13,
    textAlign: 'center'
  }
});

import { StyleSheet } from 'react-native';
import { isMobile, isWeb } from 'shelter/utils/platform.utils';

import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';
import { customNftContainerSize } from '../../constants';

export const styles = StyleSheet.create({
  root: {
    width: isWeb ? 'calc(50% - 8px)' : customNftContainerSize,
    ...(isMobile && { height: customNftContainerSize }),
    marginBottom: getCustomSize(2.5)
  },
  marginRight: {
    marginRight: getCustomSize(2)
  },
  imageWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: getCustomSize()
  },
  collectibleName: {
    ...typography.captionInterSemiBold13,
    textAlign: 'center'
  }
});

import { ViewStyle } from 'react-native';

import { getCustomSize } from '../../../styles/format-size';

const verticalOffset = getCustomSize(7.5); // top: 60px, bottom: 60px
export const extensionHeight = window.innerHeight - verticalOffset * 2;
export const maximiseViewStyles = {
  marginTop: verticalOffset,
  height: extensionHeight,
  borderRadius: getCustomSize(3),
  overflow: 'hidden' as ViewStyle['overflow']
};

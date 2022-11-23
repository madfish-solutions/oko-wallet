import { ViewStyle } from 'react-native';

import { windowHeight } from '../../../constants/dimensions';
import { getCustomSize } from '../../../styles/format-size';

const verticalOffset = getCustomSize(7.5); // top: 60px, bottom: 60px
export const extensionHeight = windowHeight - verticalOffset * 2;
export const maximiseViewStyles = {
  marginTop: verticalOffset,
  // TODO: Sviat - fix this (mobile splash-screen.ts do not work)
  height: extensionHeight,
  borderRadius: getCustomSize(3),
  overflow: 'hidden' as ViewStyle['overflow']
};

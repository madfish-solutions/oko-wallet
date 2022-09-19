import { ViewStyle } from 'react-native';

import { getCustomSize } from '../../../styles/format-size';

// maximise-view options
const verticalOffset = getCustomSize(7.5); // top: 60px, bottom: 60px
export const extensionHeight = window.innerHeight - verticalOffset * 2;
export const maximiseViewDynamicStyles = { marginTop: verticalOffset, height: extensionHeight };
export const maximiseViewStyles = {
  ...maximiseViewDynamicStyles,
  borderRadius: getCustomSize(3),
  overflow: 'hidden' as ViewStyle['overflow']
};

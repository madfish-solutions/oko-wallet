import { Dimensions } from 'react-native';

import { getCustomSize } from '../../styles/format-size';
import { isWeb } from '../../utils/platform.utils';

export const SHOW_QR_CODE = 0;
export const HIDE_QR_CODE = getCustomSize(20);
export const MIDDLE_VALUE = getCustomSize(9);

const headerHeight = isWeb ? getCustomSize(15.25) : getCustomSize(11.75);
const navBarHeight = getCustomSize(11.5);
const extraElements = headerHeight + navBarHeight;
const qrCodeHeight = getCustomSize(20);

export const contentHeight = Dimensions.get('window').height - extraElements + qrCodeHeight;

import { isWeb } from 'shared';

import { windowHeight } from '../../../constants/dimensions';
import { getCustomSize } from '../../../styles/format-size';

export const SHOW_QR_CODE = 0;
export const HIDE_QR_CODE = getCustomSize(20);
export const MIDDLE_VALUE = getCustomSize(9);

const headerHeight = isWeb ? getCustomSize(14.25) : getCustomSize(10.75);
const navBarHeight = getCustomSize(9);
const extraElements = headerHeight + navBarHeight;
const qrCodeHeight = getCustomSize(20);

const webAvailableHeight = `calc(100vh - ${extraElements}px + ${qrCodeHeight}px)`;
const mobileAvailableHeight = windowHeight - extraElements + qrCodeHeight;

export const contentHeight = isWeb ? webAvailableHeight : mobileAvailableHeight;

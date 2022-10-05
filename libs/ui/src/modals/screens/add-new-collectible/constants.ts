import { EXTENSION_WIDTH } from '../../../constants/defaults';
import { mobileWidth } from '../../../constants/mobile-dimensions';
import { getCustomSize } from '../../../styles/format-size';
import { isMobile } from '../../../utils/platform.utils';

const COLLECTIBLE_SIZE_MOBILE = mobileWidth - getCustomSize(4);
const COLLECTIBLE_SIZE_WEB = EXTENSION_WIDTH - getCustomSize(4);

export const COLLECTIBLE_SIZE = isMobile ? COLLECTIBLE_SIZE_MOBILE : COLLECTIBLE_SIZE_WEB;

import { isMobile } from 'shared';

import { EXTENSION_WIDTH } from '../../../constants/defaults';
import { windowWidth } from '../../../constants/dimensions';
import { getCustomSize } from '../../../styles/format-size';

const COLLECTIBLE_SIZE_MOBILE = windowWidth - getCustomSize(4);
const COLLECTIBLE_SIZE_WEB = EXTENSION_WIDTH - getCustomSize(4);

export const COLLECTIBLE_SIZE = isMobile ? COLLECTIBLE_SIZE_MOBILE : COLLECTIBLE_SIZE_WEB;

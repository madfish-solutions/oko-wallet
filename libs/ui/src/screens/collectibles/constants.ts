import { windowWidth } from '../../constants/dimensions';
import { isMobile } from '../../utils/platform.utils';

// paddingHorizontal: 16px * 2; offset between nft: 16px = 48px
export const customNftContainerSize = (windowWidth - 48) / 2;

export const COLLECTIBLE_SIZE = isMobile ? customNftContainerSize : '100%';

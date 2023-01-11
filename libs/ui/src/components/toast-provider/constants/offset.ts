import { isFullpage } from '../../../utils/location.utils';
import { isMobile, isWeb } from '../../../utils/platform.utils';
import { extensionHeight } from '../../navigator/utils/maximise-view-options';

const isExtensionOpen = isWeb && !isFullpage;
const offsetMobile = 92;
const offsetMaximizeView = -(extensionHeight - 16);
const offsetExtension = -525;

export const offset = isMobile ? offsetMobile : isExtensionOpen ? offsetExtension : offsetMaximizeView;

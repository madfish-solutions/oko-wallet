import { isFullpage } from '../../../utils/location.utils';
import { isMobile, isWeb } from '../../../utils/platform.utils';
import { extensionHeight } from '../../navigator/utils/maximise-view-options';

const isExtensionOpen = isWeb && !isFullpage;
const offsetMobile = 95;
const offsetMaximizeView = -(extensionHeight - 20);
const offsetExtension = -521;

export const offset = isMobile ? offsetMobile : isExtensionOpen ? offsetExtension : offsetMaximizeView;

import { isFullpage } from '../../../utils/location.utils';
import { isMobile, isWeb } from '../../../utils/platform.utils';
import { extensionHeight } from '../../navigator/utils/maximise-view-options';

export const offset = isMobile ? 95 : isWeb && !isFullpage ? -505 : -(extensionHeight - 40);

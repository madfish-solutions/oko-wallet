import { isMaximiseScreen } from '../../../utils/check-active-application-session.util';
import { isMobile, isWeb } from '../../../utils/platform.utils';
import { extensionHeight } from '../../navigator/utils/maximise-view-options';

export const offset = isMobile ? 95 : isWeb && !isMaximiseScreen ? -505 : -(extensionHeight - 40);

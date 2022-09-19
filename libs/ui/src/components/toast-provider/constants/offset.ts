import { isMaximiseScreen, isWeb } from '../../../utils/platform.utils';
import { extensionHeight } from '../../navigator/utils/maximise-view-options';

export const offset = isWeb && !isMaximiseScreen ? -505 : -(extensionHeight - 40);

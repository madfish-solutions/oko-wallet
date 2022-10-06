import { OnEventFn } from '@rnw-community/shared';

import { openMaximiseScreen } from './open-maximise-screen.util';
import { isMaximiseScreen, isMobile } from './platform.utils';

export const onPasteClipboard = async (callback: OnEventFn<void>) => {
  const status = await navigator.permissions.query({ name: 'clipboard-read' });

  if (status.state === 'prompt' && !isMaximiseScreen && !isMobile) {
    openMaximiseScreen();
  }

  callback();
};

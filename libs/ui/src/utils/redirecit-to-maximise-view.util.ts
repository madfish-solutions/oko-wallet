import { OnEventFn } from '@rnw-community/shared';

import { isFullpage } from './location.utils';
import { openMaximiseScreen } from './open-maximise-screen.util';
import { isWeb } from './platform.utils';

export const redirectToMamixiseView = (fn: OnEventFn<void>) => {
  fn();

  if (isWeb && !isFullpage) {
    setTimeout(openMaximiseScreen, 0);
  }
};

import { OnEventFn } from '@rnw-community/shared';

import { isFullpage } from './location.utils';
import { openFullViewPage } from './open-maximise-screen.util';
import { isWeb } from './platform.utils';

export const redirectToFullViewPage = (fn: OnEventFn<void>) => {
  fn();

  if (isWeb && !isFullpage) {
    setTimeout(openFullViewPage, 0);
  }
};

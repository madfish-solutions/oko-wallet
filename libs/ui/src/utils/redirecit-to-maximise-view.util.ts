import { globalNavigationRef } from '../components/navigator/navigator';
import { ScreensEnum } from '../enums/sreens.enum';

import { isFullpage } from './location.utils';
import { openFullViewPage } from './open-maximise-screen.util';
import { isWeb } from './platform.utils';

export const redirectToFullViewPage = (screen: ScreensEnum) => {
  // @ts-ignore
  globalNavigationRef.current?.navigate(screen);

  if (isWeb && !isFullpage) {
    setTimeout(openFullViewPage);
  }
};

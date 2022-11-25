import { isFullpage } from './location.utils';
import { openMaximiseScreen } from './open-maximise-screen.util';
import { isWeb } from './platform.utils';

export const redirectToMamixiseView = () => {
  if (isWeb && !isFullpage) {
    openMaximiseScreen();
  }
};

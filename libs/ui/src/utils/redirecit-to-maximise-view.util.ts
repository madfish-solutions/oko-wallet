import { openMaximiseScreen } from './open-maximise-screen.util';
import { isMaximiseScreen, isWeb } from './platform.utils';

export const redirectToMamixiseView = () => {
  if (isWeb && !isMaximiseScreen) {
    openMaximiseScreen();
  }
};

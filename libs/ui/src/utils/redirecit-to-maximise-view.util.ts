import { isMaximiseScreen } from './check-active-application-session.util';
import { openMaximiseScreen } from './open-maximise-screen.util';
import { isWeb } from './platform.utils';

export const redirectToMamixiseView = () => {
  if (isWeb && !isMaximiseScreen) {
    openMaximiseScreen();
  }
};

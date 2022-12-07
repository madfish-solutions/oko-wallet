import { RefObject, useEffect, useState } from 'react';
import { AppState } from 'react-native';

import { ScreensEnum } from '../../../enums/sreens.enum';
import { isAndroid, isIOS } from '../../../utils/platform.utils';

export const useAppStateChange = (currentRouteRef: RefObject<ScreensEnum>) => {
  const [showSecurityScreen, setShowSecurityScreen] = useState(false);

  useEffect(() => {
    if (isIOS) {
      const changeListener = AppState.addEventListener('change', appState => {
        if (['background', 'inactive'].includes(appState) && currentRouteRef.current !== ScreensEnum.Unlock) {
          setShowSecurityScreen(true);
        } else {
          setShowSecurityScreen(false);
        }
      });

      return () => changeListener.remove();
    }

    if (isAndroid) {
      const focusListener = AppState.addEventListener('focus', () => setShowSecurityScreen(false));
      const blurListener = AppState.addEventListener('blur', () => setShowSecurityScreen(true));

      return () => {
        focusListener.remove();
        blurListener.remove();
      };
    }
  }, []);

  return { showSecurityScreen };
};

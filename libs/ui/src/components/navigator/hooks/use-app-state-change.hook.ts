import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

import { isAndroid, isIOS } from '../../../utils/platform.utils';

export const useAppStateChange = () => {
  const [showSecurityScreen, setShowSecurityScreen] = useState(false);

  useEffect(() => {
    if (isIOS) {
      const changeListener = AppState.addEventListener('change', appState =>
        setShowSecurityScreen(['background', 'inactive'].includes(appState))
      );

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

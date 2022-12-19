import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

export const useShowSecurityScreen = () => {
  const [showSecurityScreen, setShowSecurityScreen] = useState(false);

  useEffect(() => {
    const focusListener = AppState.addEventListener('focus', () => setShowSecurityScreen(false));
    const blurListener = AppState.addEventListener('blur', () => setShowSecurityScreen(true));

    return () => {
      focusListener.remove();
      blurListener.remove();
    };
  }, []);

  return showSecurityScreen;
};

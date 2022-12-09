import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

export const useShowSecurityScreen = () => {
  const [showSecurityScreen, setShowSecurityScreen] = useState(false);

  useEffect(() => {
    const changeListener = AppState.addEventListener('change', appState =>
      setShowSecurityScreen(['background', 'inactive'].includes(appState))
    );

    return () => changeListener.remove();
  }, []);

  return showSecurityScreen;
};

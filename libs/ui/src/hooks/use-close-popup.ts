import { useEffect } from 'react';

import { sendErrorToDAppAndClosePopup } from '../utils/dapp.utils';

export const useClosePopup = (id: string) => {
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      sendErrorToDAppAndClosePopup(id);
    });

    return window.removeEventListener('beforeunload', () => {
      sendErrorToDAppAndClosePopup(id);
    });
  }, []);
};
